<?php

declare(strict_types=1);

namespace App\Model\Order;

use DateTimeImmutable;

final class Order {

    

    public function __construct(
        private string $id,
        private \DateTimeImmutable $createdAt,
    ) {}

    public function getId(): string {
        return $this->id;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getCreatedAtIso() : string {
        return $this->createdAt->format(DATE_ATOM);
    }

}