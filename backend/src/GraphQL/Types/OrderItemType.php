<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQl\Type\Definition\Type;

final class OrderItemType extends ObjectType {

    public function __construct() {
        parent::__construct([
            'name' => 'OrderItem',
            'fields' => fn() => [
                'id' => Type::nonNull(Type::id()),
                'productId' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'selectedAttributes' => Type::nonNull(Type::listOf(Type::nonNull(Types::selectedAttribute()))),
            ],
        ]);
    }
} 