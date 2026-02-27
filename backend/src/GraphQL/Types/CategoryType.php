<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\ProductType;

final class CategoryType extends ObjectType {
    public function __construct(){

        parent::__construct([
            'name' => 'Category',
            'fields' => fn() => [
                'id' => Type::nonNull(Type::int()),
                'name' => Type::nonNull(Type::string()),

                'products' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Types::product()))),
                    'resolve' => fn(array $category, array $args, array $context) => 
                    $context['productRepository']->fetchByCategoryId((int)$category['id']),
                ]
            ],            
        ]);
    }
}