<?php

namespace App\GraphQL;

use GraphQL\Type\Schema;
use App\Config\Database;
use App\GraphQL\Types\QueryType;

class SchemaFactory 
{
    private Database $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function create(): Schema {
        return new Schema([
            "query" => new QueryType($this->database)
        ]);
    }
}