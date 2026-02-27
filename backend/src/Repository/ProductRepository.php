<?php

namespace App\Repository;

use App\Model\Product\AbstractProduct;
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

        $sql = " 
            SELECT
                p.id, 
                p.name, 
                p.in_stock, 
                p.description, 
                p.brand, 
                p.category_id,
                c.name AS category
            FROM products p
            INNER JOIN categories c ON c.id = p.category_id
            WHERE p.category_id = :category_id
            ORDER BY p.name ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['category_id' => $categoryId]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];

        $products = [];

        foreach($rows as $row) {
            $products[] = $this->mapRowToProduct($row);
        }

        return $products;
    }

    public function fetchById(string $id) : ? AbstractProduct {
        $sql = "
            SELECT
                p.id, 
                p.name, 
                p.in_stock, 
                p.description, 
                p.brand, 
                p.category_id,
                c.name AS category
            FROM products p
            INNER JOIN categories c ON c.id = p.category_id
            WHERE p.id = :id
            LIMIT 1
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if(!$row) {
           return null;
        }

         return $this->mapRowToProduct($row);
    }

    private function mapRowToProduct(array $row): AbstractProduct
{
    return new SimpleProduct(
        (string)$row['id'],
        (string)$row['name'],
        (bool)$row['in_stock'],
        (string)($row['description'] ?? ''),
        (string)($row['brand'] ?? ''),
        (int)$row['category_id'],
        (string)($row['category'] ?? '')
    );
}
}