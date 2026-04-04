<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\Types\Types;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

final class OrderItemInputType extends InputObjectType {

    public function __construct() {

        parent::__construct([
            'name' => 'OrderItemInput',
            'fields' => fn() => [
                'productId' => Type::nonNull(Type::string()),
                'quantity' => Type::nonNull(Type::int()),
                'selectedAttributes' => Type::listOf(Type::nonNull(Types::selectedAttributeInput())),
            ],
        ]);
    }
}