<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Order\Order;
use App\Repository\OrderRepository;
use DateTimeImmutable;

final class OrderService {

    public function __construct(
        private OrderRepository $orders, 
        private \PDO $pdo
    ){}

    public function createEmpty() : Order {
        $id = bin2hex(random_bytes(16));

        $startedTxn = false;

        if(!$this->pdo->beginTransaction()){
            $this->pdo->beginTransaction();
            $startedTxn = true;
        }       

        try {
            $createdAtStr = $this->orders->insert($id);

            if($startedTxn) {
                $this->pdo->commit();
            }

            $createdAt = new DateTimeImmutable($createdAtStr);

            return new Order($id, $createdAt);
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