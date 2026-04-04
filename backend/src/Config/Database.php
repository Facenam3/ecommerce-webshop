<?php

namespace App\Config;

use PDO;
use PDOException;

class Database
{
    private PDO $connection;

    public function __construct()
    {
        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $db   = $_ENV['DB_NAME'] ?? '';
        $user = $_ENV['DB_USER'] ?? '';
        $pass = $_ENV['DB_PASS'] ?? '';

        $dsn = "mysql:host={$host};dbname={$db};charset=utf8mb4";

        try {
            $this->connection = new PDO(
                $dsn,
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true,
                ]
            );
        } catch (PDOException $e) {
            throw new \Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}