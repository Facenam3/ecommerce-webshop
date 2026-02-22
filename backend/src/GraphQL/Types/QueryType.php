<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Config\Database;
use App\Repository\ProductRepository;

class QueryType extends ObjectType {
    public function __construct(Database $database)
    {
        parent::__construct([
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(Type::string()),
                    'resolve' => function () use ($database) {
                        $repo = new ProductRepository($database->getConnection());
                        return $repo->getAll();
                    },
                ],
            ],
        ]);
    }
}
