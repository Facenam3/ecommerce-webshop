<?php

declare(strict_types=1);

namespace App\Model\Product;

abstract class AbstractProduct {
    protected string $id;
    protected string $name;
    protected bool $inStock;
    protected string $description;
    protected string $brand;
    protected int $categoryId;
    protected string $category;

    public function __construct(
        string $id, 
        string $name,
        bool $inStock,
        string $description,
        string $brand,
        int $categoryId,
        string $category,
    ){
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->brand = $brand;
        $this->categoryId = $categoryId;
        $this->category = $category;
    }

    public function getId(): string {
        return $this->id;
    }

    public function getName() : string {
        return $this->name;
    }

    public function isInStock() : bool {
        return $this->inStock;
    }

    public function getDescription(): string{
        return $this->description;
    }

    public function getBrand(): string {
        return $this->brand;
    }

    public function getCategory(): string {
        return $this->category;
    }

    public function getCategoryId(): int {
        return $this->categoryId;
    }

    public function toArray(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'in_stock' => $this->inStock,
            'description' => $this->description,
            'brand' => $this->brand,
            'category_id' => $this->categoryId,
            'category' => $this->category,
        ];
    }

    abstract public function getType() : string;
}