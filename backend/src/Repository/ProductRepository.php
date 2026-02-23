<?php

namespace App\Repository;

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
            c.name as category
            FROM prdoucts p
            INNER JOIN categories c ON c.id = p.category_id
            ORDER BY p.id
        ";

        return $this->pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
    }
}