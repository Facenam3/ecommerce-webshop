<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class SelectedAttributeType extends ObjectType {

    public function __construct() {
        parent::__construct([
            'name' => 'SelectedAttribute',
            'fields' => fn() => [
                'attributeId' => Type::nonNull(Type::string()),
                'itemId' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}