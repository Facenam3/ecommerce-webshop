<?php

declare(strict_types=1);

namespace App\Model\Order;

final class Order {

    private string $id;
    private \DateTimeImmutable $createdAt;

    public function __construct(
        string $id,
        $createdAt,
    ) {}

    public function getId(): string {
        return $this->id;
    }

    public function getCreatedAt() : string {
        return $this->createdAt->format('');
    }

}