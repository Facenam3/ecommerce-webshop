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
            i.id AS item_id,
            i.display_value as item_display_value,
            i.value AS item_value
            FROM product_attribute_sets pas
            INNER JOIN attribute sets s
                ON s.id = pas.attribute_set_id
            WHERE pas.product_id = :product_id
            ORDER BY s.id, i.id
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([":product_id" => $productId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}