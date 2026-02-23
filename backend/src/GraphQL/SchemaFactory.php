<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use App\GraphQL\Types\QueryType;

class SchemaFactory 
{

    public function create(): Schema {
        return new Schema([
            "query" => new QueryType(),
        ]);
    }
}