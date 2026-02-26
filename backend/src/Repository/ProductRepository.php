<?php

namespace App\Repository;

use App\Model\Product\SimpleProduct;
use PDO;

class ProductRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function fetchAll() : array {
        $sql = "
            SELECT 
            p.id,
            p.name,
            p.in_stock,
            p.description,
            p.brand,
            p.category_id,
            c.name as category
            FROM products p
            INNER JOIN categories c ON c.id = p.category_id
            ORDER BY p.id
        ";

        $rows = $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        $products = [];
        foreach($rows as $row) {
            $products[] = new SimpleProduct(
                (string)$row['id'],
                (string)$row['name'],
                (bool)$row['in_stock'],
                (string)($row['description'] ?? ''),
                (string)($row['brand'] ?? ''),
                (int)$row['category_id'],
                (string)$row['category']
            );
        }

        return $products;
    }

    public function fetchByCategoryId(int $categoryId): array {

        $sql = "SELECT * FROM products 
                WHERE category_id = :category_id
                ORDER BY name ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['category_id' => $categoryId]);

        return $this->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }
}