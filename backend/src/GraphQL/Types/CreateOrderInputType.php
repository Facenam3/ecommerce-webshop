<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\GraphQL\Types\Types;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

final class CreateOrderInputType extends InputObjectType{

    public function __construct(){

        parent::__construct([
            'name' => 'CreateOrderInput',
            'fields' => fn() => [
                'items' => Type::nonNull(Type::listOf(Type::nonNull(Types::orderItemInput()))),
            ],
        ]);
    }
}