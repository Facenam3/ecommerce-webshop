<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Repository\ProductRepository;
use App\GraphQL\Types\ProductType;

class QueryType extends ObjectType {
    public function __construct()
    {
        $productType = new ProductType();
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
            ],
        ]);
    }
}
