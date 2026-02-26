<?php

declare(strict_types=1);

namespace App\Service;

use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;

final class CategoryService {

    public function __construct(
        private CategoryRepository $categories,
        private ProductRepository $products,
    ){}

    public function getAll() : array {
        return $this->categories->fetchAll();
    }

    public function getById(int $id) : ?array{
        return $this->categories->fetchById($id);
    }

    public function getProductsFor(array $category): array {
        return $this->products->fetchByCategoryId((int)$category['id']);
    }
}