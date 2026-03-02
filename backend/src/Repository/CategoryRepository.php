<?php 

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class CategoryRepository{

    public function __construct(private PDO $pdo) {}

    public function fetchAll() : array {

        $sql = "SELECT id, name FROM categories ORDER by id ASC";

        $stmt = $this->pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC) ?: [];
    }

    public function fetchById(string $id) : ?array {

        $sql = "
            SELECT id, name
            FROM categories
            WHERE id = :id
            LIMIT 1
        ";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row ?: null;
    }
}