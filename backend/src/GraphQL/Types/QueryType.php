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
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Types::product()))),
                    'args' => [
                        'categoryId' => Type::id(),
                    ],
                    'resolve' => static function ($root, array $args, array $context) {
                        $productRepo = $context['productRepository'];

                        if(!empty($args['categoryId'])){
                            return $productRepo->fetchByCategoryId((int) $args['categoryId']);
                        }

                        return $productRepo->fetchAll();
                    }
                ],
                'categories' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Types::category()))),
                    'resolve' => fn($root, array $args, array $context) => $context['categoryService']->getAll(),
                ],
                'category' => [
                    'type' => Types::category(),
                    'args' => [
                        'id' => Type::nonNull(Type::id()),
                    ],
                    'resolve' => fn($root, array $args, array $context) => $context['categoryService']->getById((string)$args['id']),
                ],
                'product' => [
                    'type' => Types::product(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => fn($root, array $args, array $context) =>
                    $context['productRepository']->fetchById($args['id']),
                ],
                'order' => [
                    'type' => Types::order(),
                    'args' => [
                        'id' => Type::nonNull(Type::id()),
                    ],
                    'resolve' => static function($root, array $args, array $context) {
                        error_log("order() resolver id=" . ($args['id'] ?? 'MISSING'));
                        return $context['orderService']->getById((string)$args['id']);
                    }
                ],
                'orders' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Types::order()))),
                    'resolve' => static function($root, array $args, array $context) {
                        return $context['orderService']->list();
                    }
                ],
            ],
        ]);
    }
}
