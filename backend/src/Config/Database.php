<?php 

namespace App\Config;

use PDO;
use PDOException;

class Database {
    private PDO $connection;

    public function __construct()
    {
        try {
            $this->connection = new PDO(
                "myslq:host=" . $_ENV["DB_HOST"] . ";dbname=" . $_ENV["DB_NAME"],
                $_ENV["DB_USER"],
                $_ENV["DB_PASS"]
            );

            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            throw new \Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() : PDO {
        return $this->connection;
    }
}