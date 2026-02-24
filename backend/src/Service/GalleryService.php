<?php

declare(strict_types=1);

namespace App\Service;

use App\Repository\GalleryRepository;

final class GalleryService {
    public function __construct(private GalleryRepository $galleryRepository) {}

    public function getByProductId(string $productId) : array {
        return $this->galleryRepository->fetchUrlsByProductId($productId);
    }
}