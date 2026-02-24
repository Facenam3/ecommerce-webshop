<?php 

declare(strict_types=1);

require_once __DIR__ . "/../vendor/autoload.php";

use App\Config\Database;
use Dotenv\Dotenv;

final class Seeder 
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function run(string $jsonPath) : void {
        if(!is_file($jsonPath)){
            throw new RuntimeException("data.json not found at: {$jsonPath}");
        }

        $raw = file_get_contents($jsonPath);
        if($raw === false || trim($raw) === ""){
            throw new RuntimeException("Failed to read JSON or JSON is empty: {$jsonPath}");
        }

        $payload = json_decode($raw, true);
        if(!is_array($payload)){
            throw new RuntimeException("Invalid JSON in {$jsonPath}");
        }

        $data = $payload['data'] ?? null;
        if(!is_array($data)){
            throw new RuntimeException('JSON must contain top-level "data" object.');
        }

        $categories = $data['categories'] ?? null;
        $products = $data['products'] ?? null;

        $this->pdo->beginTransaction();

        try {
            $categoryIdByName = $this->seedCategories($categories);

            $this->seedCurrenciesFromProducts($products);

            $this->seedProducts($products, $categoryIdByName);

            $this->pdo->commit();
        } catch (\Throwable $th) {
            $this->pdo->rollBack();
            throw $th;
        }
    }

    private function seedCategories(array $categories) : array 
    {
        $insert = $this->pdo->prepare(
            "INSERT INTO categories (name) VALUES (:name)"
        );

        $select = $this->pdo->prepare(
            "SELECT id, name FROM categories"
        );

        foreach($categories as $cat) {
            $name = (string)($cat['name'] ?? "");
            if($name === ""){
                continue;
            }

            $stmt = $this->pdo->prepare(
                "INSERT IGNORE INTO categories (name) VALUES (:name)"
            );
            $stmt->execute([":name" => $name]);
        }

        $select->execute();
        $rows = $select->fetchAll(PDO::FETCH_ASSOC);

        $map = [];
        foreach($rows as $row) {
            $map[(string)$row['name']] = (int)$row['id'];
        }

        return $map;
    }

    private function seedCurrenciesFromProducts(array $products): void 
    {
        $stmt = $this->pdo->prepare(
            "INSERT IGNORE INTO currencies (code, label, symbol) VALUES (:code, :label, :symbol)"
        );

        foreach ($products as $p) {
            $prices = $p['prices'] ?? [];
            if (!is_array($prices)) {
                continue;
            }

            foreach($prices as $price) {
                $currency = $price['currency'] ?? null;
                if(!is_array($currency)){
                    continue;
                }

                $label = (string)($currency['label'] ?? "");
                $symbol = (string)($currency['symbol'] ?? "");

                $code = $label;

                if($code === "" || $symbol === "" || $label === ""){
                    continue;
                }

                $stmt->execute([
                    ':code' => $code,
                    ':label' => $label,
                    ':symbol' => $symbol,
                ]);
            }
        }
    }

    private function seedProducts(array $products, array $categoryIdByName): void 
    {
        $insertProduct = $this->pdo->prepare(
            "INSERT INTO products (id, name, in_stock, description, brand, category_id)
            VALUES (:id, :name, :in_stock, :description, :brand, :category_id)
            ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            in_stock = VALUES(in_stock),
            description = VALUES(description),
            brand = VALUES(brand),
            category_id = VALUES(category_id)
            "
        );

        $insertGallery = $this->pdo->prepare(
            "INSERT INTO product_gallery (product_id, image_url, position)
            VALUES (:product_id, :image_url, :position)"
        );

        $deleteGallery = $this->pdo->prepare(
            "DELETE FROM product_gallery WHERE product_id = :product_id"
        );

        $insertPrice  = $this->pdo->prepare(
            "INSERT INTO product_prices (product_id, currency_code, amount)
            VALUES (:product_id, :currency_code, :amount)
            ON DUPLICATE KEY UPDATE amount = VALUES(amount)"
        );

        $insertAttrSet = $this->pdo->prepare(
            "INSERT INTO attribute_sets (id, name, type)
            VALUES (:id, :name, :type)
            ON DUPLICATE KEY UPDATE name = VALUES(name), type = VALUES(type)"
        );

        $insertProductAttrItem = $this->pdo->prepare(
            "INSERT INTO product_attribute_items 
            (product_id, attribute_set_id, item_id, display_value, value, position)
            VALUES
            (:product_id, :set_id, :item_id, :display_value, :value, :position)
            ON DUPLICATE KEY UPDATE
            display_value = VALUES(display_value),
            value = VALUES(value),
            position = VALUES(position)
            "
        );

        $deleteProductAttrItems = $this->pdo->prepare(
            'DELETE FROM product_attribute_items WHERE product_id = :product_id'
        );

        $insertProductAttrSet = $this->pdo->prepare(
            "INSERT IGNORE INTO product_attribute_sets (product_id, attribute_set_id)
            VALUES (:product_id, :set_id)"
        );

        $deleteProductAttrSets = $this->pdo->prepare(
            "DELETE FROM product_attribute_sets WHERE product_id = :product_id"
        );

        foreach($products as $p) {
            $id = (string)($p['id'] ?? "");
            if($id === "") {
                continue;
            }

            $name = (string)($p['name'] ?? "");
            $inStock = (bool)($p['inStock'] ?? false);
            $description = (string)($p['description'] ?? "");
            $brand = (string)($p['brand'] ?? "");
            $categoryName = (string)($p['category'] ?? "");

            if(!isset($categoryIdByName[$categoryName])) {
                $stmt = $this->pdo->prepare(
                    "INSERT IGNORE INTO categories (name) VALUES (:name)"
                );
                $stmt->execute([":name" => $categoryName]);

                $stmt2 = $this->pdo->prepare(
                    "SELECT id FROM categories WHERE name = :name"
                );
                $stmt2->execute([':name' => $categoryName]);
                $categoryIdByName[$categoryName] = (int)$stmt2->fetchColumn();
            }

            $categoryId = (int)$categoryIdByName[$categoryName];

            $insertProduct->execute([
                ':id' => $id,
                ':name' => $name,
                ':in_stock' => $inStock ? 1 : 0,
                ':description' => $description,
                ':brand' => $brand,
                ':category_id' => $categoryId,
            ]);

            $deleteGallery->execute([":product_id" => $id]);

            $gallery = $p['gallery'] ?? [];
            if(is_array($gallery)) {
                $pos = 0;
                foreach($gallery as $url) {
                    $url = (string)$url;
                    if($url === '') continue;

                    $insertGallery->execute([
                        ':product_id' => $id,
                        ':image_url' => $url,
                        ':position' => $pos,
                    ]);
                    $pos++;
                }
            }

            $prices = $p['prices'] ?? [];
            if(is_array($prices)){
                foreach($prices as $price) {
                    if(!is_array($price)) continue;

                    $amount = $price['amount'] ?? null;
                    $currency = $price['currency'] ?? null;

                    if(!is_numeric($amount) || !is_array($currency)) continue;

                    $code = (string)($currency['label'] ?? '');
                    if($code === "") continue;

                    $insertPrice->execute([
                        ':product_id' => $id,
                        ':currency_code' => $code,
                        ':amount' => number_format((float)$amount, 2, ".", ""),
                    ]);
                }
            }

            $deleteProductAttrSets->execute([':product_id' => $id]);
            $deleteProductAttrItems->execute([':product_id' => $id]);

            $attributeSets = $p['attributes'] ?? [];
            if(is_array($attributeSets)) {
                foreach($attributeSets as $set) {
                    if(!is_array($set)) continue;

                    $setId = (string)($set['id'] ?? '');
                    $setName = (string)($set['name'] ?? $setId);
                    $setType = (string)($set['type'] ?? "text");

                    if($setId === "") continue;
                    if(!in_array($setType, ['text','swatch'], true)) {
                        $setType = 'text';
                    }

                    $insertAttrSet->execute([
                        ':id' => $setId,
                        ':name' => $setName,
                        ':type' => $setType,
                    ]);

                    $items = $set["items"] ?? [];
                    if(is_array($items)) {
                        $pos = 0;
                        foreach($items as $item) {
                            if(!is_array($item)) continue;

                            $itemId = (string)($item['id'] ?? "");
                            if($itemId === '') continue;

                            $insertProductAttrItem->execute([
                                ':product_id' => $id,
                                ':set_id' => $setId,
                                ':item_id' => $itemId,
                                ':display_value' => (string)($item['displayValue'] ?? ''),
                                ':value' => (string)($item['value'] ?? ''),
                                'position' => $pos,
                            ]);

                            $pos++;
                        }
                    }

                    $insertProductAttrSet->execute([
                        ':product_id' => $id,
                        ':set_id' => $setId,
                    ]);
                }
            }
        }
    }
}

$dotenv = Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$db = new Database();
$pdo = $db->getConnection();

$seeder = new Seeder($pdo);
$seeder->run(__DIR__ . '/../data/data.json');

echo "Seed completed\n";
