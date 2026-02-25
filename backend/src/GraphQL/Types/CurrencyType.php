<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class CurrencyType extends ObjectType {
    
    public function __construct() {

        parent::__construct([
            'name' => 'Currency',
            'fields' => [
                'label' => Type::nonNull(Type::string()),
                'symbol' => Type::nonNull(Type::string()),
            ],
            'resolveField' => static fn (array $currency, array $args, $context, $info) =>
                match($info->fieldName) {
                    'label' => (string)($currency['label'] ?? ''),
                    'symbol' => (string)($currency['symbol'] ?? ''),
                    default => null,
                },
        ]);
        
        
    }
}