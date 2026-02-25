<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class PriceType extends ObjectType {

    public function __construct(){

        $currencyType = new CurrencyType();
        
        parent::__construct([
            'name' => "Price",
            'fields' => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => Type::nonNull($currencyType),
            ],
            'resolveField' => static fn (array $price, array $args, $context, $info) =>
                match($info->fieldName) {
                    'amount' => (float)($price['amount'] ?? 0),
                    'currency' => (array)($price['currency'] ?? []),
                    default => null,
                },
        ]);
    }
}