<?php

namespace App\Controller;

use App\Config\Database;
use App\GraphQL\SchemaFactory;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
           $rawInput = file_get_contents('php://input');
           if($rawInput === false){
            throw new RuntimeException("Failer to read request body (php://input)");
           }

           $input = json_decode($rawInput, true, 512, JSON_THROW_ON_ERROR);

           $query = $input['query'] ?? null;
           if(!$query) {
            throw new RuntimeException('Missing "query" in request body');
           }

           $variableValues = $input['variable'] ?? null;

           $database = new Database();
           $schemaFactory = new SchemaFactory($database);
           $schema = $schemaFactory->create();

           $result = GraphQLBase::executeQuery(
                schema: $schema,
                source: $query,
                contextValue: [
                    'db' => $database->getConnection(),
                ],
                variableValues: $variableValues,
           );

           $output = $result->toArray();

        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}