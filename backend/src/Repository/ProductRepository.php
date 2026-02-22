<?php

namespace App\Repository;

use PDO;

class ProductRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAll() : array {
        $stmt = $this->pdo->query("SELECT name FROM products");
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
}