<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class AttributeRepository {
    public function __construct(private PDO $pdo) {}
   
    public function fetchByProductId(string $productId) : array {
        $sql = "
           SELECT 
            s.id AS set_id,
            s.name AS set_name,
            s.type AS set_type,
            pai.item_id AS item_id,
            pai.display_value AS item_display_value,
            pai.value AS item_value
           FROM product_attribute_sets pas
           INNER JOIN attribute_sets s
            ON s.id = pas.attribute_set_id
           LEFT JOIN product_attribute_items pai
            ON pai.product_id = pas.product_id
            AND pai.attribute_set_id = s.id
           WHERE pas.product_id = :product_id
           ORDER BY s.id, pai.position, pai.item_id
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":product_id" => $productId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}