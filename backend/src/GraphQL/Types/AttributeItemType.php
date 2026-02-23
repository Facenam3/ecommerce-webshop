<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Model\Attribute\AttributeItem;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class AttributeItemType extends ObjectType {
    public function __construct() {
        parent::__construct([
            'name' => 'AttributeItem',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'displayValue' => Type::nonNull(Type::string()),
                'value' => Type::nonNull(Type::string()),
            ],
            'resolveField' => static function(AttributeItem $item, array $args, $context, $info){
                return match ($info->fieldName) {
                    'id' => $item->getid(),
                    'displayValue' => $item->getDisplayValue(),
                    'value' => $item->getValue(),
                    default => null,
                };
            },
        ]);
    }
}