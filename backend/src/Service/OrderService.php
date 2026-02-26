<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Order\Order;
use App\Repository\OrderRepository;

final class OrderService {

    public function __construct(
        private OrderRepository $orders, 
        private \PDO $pdo
    ){}

    public function createEmpty() : Order {
        $id = bin2hex(random_bytes(16));

        $this->pdo->beginTransaction();

        try {
            $this->orders->insert($id);
            $this->pdo->commit();
        } catch (\Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }

        return new Order(
            $id,
            new \DateTimeImmutable()
        );
    }
}