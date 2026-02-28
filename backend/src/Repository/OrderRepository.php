<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class OrderRepository {

    public function __construct(private PDO $pdo) {}

    public function insert(string $id): string
    {
        $stmt = $this->pdo->prepare("
            INSERT INTO orders (id, created_at)
            VALUES (:id, NOW())
        ");
        $stmt->execute([':id' => $id]);

        $stmt2 = $this->pdo->prepare("SELECT created_at FROM orders WHERE id = :id");
        $stmt2->execute([':id' => $id]);

        $createdAt = (string)$stmt2->fetchColumn();

        return $createdAt;
    }
}