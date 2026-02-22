<?php

namespace App\Controller;

use App\Config\Database;
use App\GraphQL\SchemaFactory;
use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Error\FormattedError;
use RuntimeException;
use Throwable;

class GraphQL
{
    public static function handle(array $vars = []): string
    {
        try {
            $len = (int)($_SERVER['CONTENT_LENGTH'] ?? 0);
            $rawInput = '';

            if ($len > 0) {
                $stream = fopen('php://input', 'rb');
                if ($stream === false) {
                    throw new RuntimeException('Failed to open php://input');
                }
                $rawInput = (string) stream_get_contents($stream, $len);
                fclose($stream);
            } else {
                $rawInput = (string) file_get_contents('php://input');
            }

            if (trim($rawInput) === '') {
                throw new RuntimeException('Empty request body. Send JSON: {"query":"{ products }"}');
            }

            $input = json_decode($rawInput, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new RuntimeException('Invalid JSON body: ' . json_last_error_msg());
            }

            $query = $input['query'] ?? null;
            if (!$query) {
                throw new RuntimeException('Missing "query" in request body');
            }

            $variableValues = $input['variables'] ?? null;

            $database = new Database();
            $schemaFactory = new SchemaFactory($database);
            $schema = $schemaFactory->create();

            $result = GraphQLBase::executeQuery(
                $schema,
                $query,
                null,
                ['db' => $database->getConnection()],
                $variableValues
            );

            $debug = filter_var($_ENV['APP_DEBUG'] ?? 'false', FILTER_VALIDATE_BOOLEAN);

            if ($debug) {
                $output = $result->toArray(DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE);
            } else {
                $output = $result->toArray();
            }
        } catch (Throwable $e) {
            $debug = filter_var($_ENV['APP_DEBUG'] ?? 'false', FILTER_VALIDATE_BOOLEAN);

            $error = FormattedError::createFromException(
                $e,
                $debug ? (DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE) : DebugFlag::NONE
            );

            $output = [
                'errors' => [$error],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        return json_encode($output);
    }
}