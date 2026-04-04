<?php

declare(strict_types=1);

namespace App\Service;

use App\Model\Order\Order;
use App\Repository\OrderRepository;
use DateTimeImmutable;
use PDO;
use RuntimeException;

final class OrderService
{
    public function __construct(
        private OrderRepository $orders,
        private PDO $pdo
    ) {}

    public function createFromInput(array $input): Order
    {
        $items = $input['items'] ?? [];
        if (!is_array($items) || count($items) === 0) {
            throw new RuntimeException('Order must contain at least one item.');
        }

        foreach ($items as $i => $item) {
            if (!isset($item['productId']) || $item['productId'] === '') {
                throw new RuntimeException("items[$i].productId is required.");
            }
            if (!isset($item['quantity']) || (int)$item['quantity'] <= 0) {
                throw new RuntimeException("items[$i].quantity must be > 0.");
            }
        }

        $id = bin2hex(random_bytes(16));

        $startedTxn = false;
        if (!$this->pdo->inTransaction()) {
            $this->pdo->beginTransaction();  
            $startedTxn = true;
        }

        try {
            $createdAtStr = $this->orders->insertFull($id, $items);

            if ($startedTxn) {
                $this->pdo->commit();
            }

            return new Order($id, new DateTimeImmutable($createdAtStr));
        } catch (\Throwable $e) {
            if ($startedTxn && $this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            throw $e;
        }
    }

    public function createEmpty(): Order
    {
        $id = bin2hex(random_bytes(16));

        $startedTxn = false;
        if (!$this->pdo->inTransaction()) {
            $this->pdo->beginTransaction();  
            $startedTxn = true;
        }

        try {
            $createdAtStr = $this->orders->insert($id);

            if ($startedTxn) {
                $this->pdo->commit();
            }

            return new Order($id, new DateTimeImmutable($createdAtStr));
        } catch (\Throwable $e) {
            if ($startedTxn && $this->pdo->inTransaction()) {
                $this->pdo->rollBack();
            }
            throw $e;
        }
    }

    public function getById(string $id): ?array {
        return $this->orders->findById($id);
    }

    public function list() : array {
        return $this->orders->findAll();
    }
}