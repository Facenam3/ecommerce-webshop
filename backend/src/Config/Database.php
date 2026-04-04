<?php

namespace App\Config;

use PDO;
use PDOException;

class Database
{
    private PDO $connection;

    public function __construct()
    {
        $host = $_ENV['MYSQLHOST'] ?? getenv('MYSQLHOST') ?: ($_ENV['DB_HOST'] ?? getenv('DB_HOST') ?: '127.0.0.1');
        $port = $_ENV['MYSQLPORT'] ?? getenv('MYSQLPORT') ?: ($_ENV['DB_PORT'] ?? getenv('DB_PORT') ?: '3306');
        $db   = $_ENV['MYSQLDATABASE'] ?? getenv('MYSQLDATABASE') ?: ($_ENV['DB_NAME'] ?? getenv('DB_NAME') ?: '');
        $user = $_ENV['MYSQLUSER'] ?? getenv('MYSQLUSER') ?: ($_ENV['DB_USER'] ?? getenv('DB_USER') ?: '');
        $pass = $_ENV['MYSQLPASSWORD'] ?? getenv('MYSQLPASSWORD') ?: ($_ENV['DB_PASS'] ?? getenv('DB_PASS') ?: '');

        $dsn = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";

        try {
            $this->connection = new PDO(
                $dsn,
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
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