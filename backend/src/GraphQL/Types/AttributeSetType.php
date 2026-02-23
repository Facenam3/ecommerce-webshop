<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Model\Attribute\AbstractAttributeSet;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class AttributeSetType extends ObjectType {
    public function __construct() {
        $itemType = new AttributeItemType();

        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'type' => Type::nonNull(Type::string()),
                'items' => Type::nonNull(Type::listOf(Type::nonNull($itemType))),
            ],
            'resolveField' => static function (AbstractAttributeSet $set, array $args, $context, $info){
                return match ($info->fieldName) {
                    'id' => $set->getId(),
                    'name' => $set->getName(),
                    'type' => $set->getType(),
                    'items' => $set->getItems(),
                    default => null,
                };
            },
        ]);
    }
}