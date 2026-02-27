<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Repository\ProductRepository;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\CategoryType;

class QueryType extends ObjectType {
    public function __construct()
    {
        $productType = new ProductType();
        $categoryType = new CategoryType();

        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull($productType))),
                    'resolve' => static function ($root, array $args, array $context) {
                        $productRepo = $context['productRepository'];
                        return $productRepo->fetchAll();
                    }
                ],
                'categories' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull($categoryType))),
                    'resolve' => fn($root, array $args, array $context) => $context['categoryService']->getAll(),
                ],
                'category' => [
                    'type' => $categoryType,
                    'args' => [
                        'id' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => fn($root, array $args, array $context) => $context['categoryService']->getById((int)$args['id']),
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => fn($root, array $args, array $context) =>
                    $context['productRepository']->fetchById($args['id']),
                ]
            ],
        ]);
    }
}
