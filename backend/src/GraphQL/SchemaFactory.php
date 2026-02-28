<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use App\GraphQL\Types\QueryType;
use App\GraphQL\Types\MutationType;

class SchemaFactory 
{

    public function create(): Schema {
        return new Schema([
            "query" => new QueryType(),
            'mutation' => new MutationType(),
        ]);
    }
}