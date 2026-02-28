<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\Types\Types;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class MutationType extends ObjectType{
    public function __construct() {

        parent::__construct([
            'name' => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => Type::nonNull(Types::order()),
                    'args' => [
                        'input' => Type::nonNull(Types::createOrderInput()),
                    ],
                    'resolve' => static function ($root, array $args, array $context) {
                        $order = $context['orderService']->createEmpty();
                        return ['id' => $order->getId()];
                    },
                ],
            ],
        ]);
    }
}