<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQl\Type\Definition\Type;

final class OrderType extends ObjectType {
    public function __construct() {

        parent::__construct([
            'name' => 'Order',
            'fields' =>  fn() => [
                'id' => Type::nonNull(Type::id()),
                'createdAt' => [
                    'type' => Type::nonNull(Type::string()),
                    'resolve' => static fn(array $order): string => (string)$order['created_at'],
                ],
                'items' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Types::orderItem()))),
                    'resolve' => static fn(array $order): array => $order['items'] ?? [],
                ],
            ],
        ]);
    }
}