<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQl\Type\Definition\Type;

final class OrderType extends ObjectType {
    public function __construct() {

        parent::__construct([
            'name' => 'Order',
            'fields' => [
                'id' => Type::nonNull(Type::id()),
            ],
        ]);
    }
}