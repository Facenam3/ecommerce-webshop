<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Service\AttributeService;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

final class ProductType extends ObjectType {
    public function __construct() {
        $attributeSetType = new AttributeSetType();

        parent::__construct([
            'name' => "Product",
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::nonNull(Type::boolean()),
                'description' => Type::string(),
                'brand' => Type::string(),
                'category' => Type::nonNull(Type::string()),

                'attributes' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull($attributeSetType))),
                    'resolve' => static function(array $product, array $args, array $context) {
                        $attributeService = $context['attributeService'];
                        return $attributeService->getByPoductId((string)$product['id']);
                    },
                ],
            ],
            'resolveField' => static fn (array $product, array $args, $context, $info) => 
                match ($info->fieldName) {
                    'id' => (string)$product['id'],
                    'name' => (string)$product['name'],
                    'inStock' => (bool)$product['in_stock'],
                    'description' => $product['description'],
                    'brand' => $product['brand'],
                    'category' => (string)$product['category'],
                    default => null,
                },
        ]);
    }
}