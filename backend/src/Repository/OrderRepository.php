<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class OrderRepository {

    public function __construct(private PDO $pdo) {}

    public function findById(string $orderId) : ?array {
        $sql = "
            SELECT id, created_at FROM orders WHERE id = :id
        "; 

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':id' => $orderId]);
        $order = $stmt->fetch();
        $stmt->closeCursor();

        if(!$order) {
            return null;
        }

        $sqlItems = "SELECT id, order_id, product_id, quantity
                    FROM order_items
                    WHERE order_id = :order_id
                    ORDER BY id
                ";

        $stmtItems = $this->pdo->prepare($sqlItems);
        $stmtItems->execute([':order_id' => $orderId]);
        $items = $stmtItems->fetchAll();
        $stmtItems->closeCursor();

        if(!$items) {
            $order['items'] = [];
            return $order;
        }

        $itemsId = array_map(static fn($i) => $i['id'], $items);

        $placeholders = [];
        $params = [];
        foreach($itemsId as $idx => $id) {
            $ph = ":id{$idx}";
            $placeholders[] = $ph;
            $params[$ph] = $id;
        }

        $sqlAttrs = "
            SELECT id, order_item_id, attribute_id, item_id
            FROM order_item_attributes
            WHERE order_item_id IN (" . implode(',', $placeholders) . ")
            ORDER BY order_item_id
        ";

        $stmtAttrs = $this->pdo->prepare($sqlAttrs);
        $stmtAttrs->execute($params);
        $attrs = $stmtAttrs->fetchAll();
        $stmtAttrs->closeCursor();

        $attrsByItem = [];
        foreach($attrs as $a) {
           $oid = $a['order_item_id'];
           $attrsByItem[$oid][] = $a;
        }

        foreach($items as &$it){
            $it['selectedAttributes'] = $attrsByItem[$it['id']] ?? [];
        }
        unset($it);

        $order['items'] = $items;

        return $order;
    } 

    public function findAll(): array {
        $sql = "
            SELECT id, created_at FROM orders ORDER BY created_at DESC
        ";
        $stmt = $this->pdo->query($sql);
        $orders = $stmt->fetchAll();
        $stmt->closeCursor();
        return $orders;
    }

    public function insert(string $id): string
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO orders (id, created_at)
            VALUES (:id, NOW())
        ");
        $stmt->execute([':id' => $id]);

        $stmt2 = $this->pdo->prepare("SELECT created_at FROM orders WHERE id = :id");
        $stmt2->execute([':id' => $id]);
        $createdAt = $stmt2->fetchColumn();
        $stmt2->closeCursor();

        if ($createdAt === false || $createdAt === null) {
            throw new \RuntimeException("Insert failed or row not found for id={$id}");
        }

        return (string)$createdAt;
    }

    public function insertFull(string $orderId, array $items) : string {
        $createdAt = $this->insert($orderId);

        $sqlItem = "INSERT INTO order_items (id, order_id, product_id, quantity)
            VALUES (:id, :order_id, :product_id, :quantity)";
        $sqlAttr = "INSERT INTO order_item_attributes (id, order_item_id, attribute_id, item_id)
                    VALUES (:id, :order_item_id, :attribute_id, :item_id)
        ";

        $stmtItem = $this->pdo->prepare($sqlItem);
        $stmtAttr = $this->pdo->prepare($sqlAttr);

        foreach ($items as $item) {
            $orderItemId = bin2hex(random_bytes(16));

            $stmtItem->execute([
                ':id' => $orderItemId,
                ':order_id' => $orderId,
                ':product_id' => $item['productId'],
                ':quantity' => (int)$item['quantity'],
            ]);

            foreach (($item['selectedAttributes'] ?? []) as $sel) {
                $stmtAttr->execute([
                    ':id' => $this->uuidV4(),
                    ':order_item_id' => $orderItemId,
                    ':attribute_id' => $sel['attributeId'],
                    ':item_id' => $sel['itemId'],
                ]);
            }
        }

        return $createdAt;
    }

    private function uuidV4() : string {
         $data = random_bytes(16);
        $data[6] = chr((ord($data[6]) & 0x0f) | 0x40);
        $data[8] = chr((ord($data[8]) & 0x3f) | 0x80);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}