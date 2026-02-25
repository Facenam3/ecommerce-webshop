<?php

declare(strict_types=1);

namespace App\Service;

use App\Repository\PriceRepository;

final class PriceService {
    public function __construct(private PriceRepository $priceRepository) {}

    public function getByProductId(string $productId) : array {
        return $this->priceRepository->fetchByProductId($productId);
    }
}