<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class OrderRepository {

    public function __construct(private PDO $pdo) {}

    public function insert(string $id) : void {
        
        $sql = "INSERT INTO orders(id, created_at)
                VALUES (:id, NOW())
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
    }
}