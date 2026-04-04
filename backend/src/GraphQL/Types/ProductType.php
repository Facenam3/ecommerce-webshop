<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

use App\Service\AttributeService;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Model\Product\AbstractProduct;

final class ProductType extends ObjectType {
    public function __construct() {
        $attributeSetType = new AttributeSetType();
        $priceType = new PriceType();

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
                    'resolve' => static function (AbstractProduct $product, array $args, array $context) {
                        return $context['attributeService']->getByProductId($product->getId());
                    },
                ],
                'gallery' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull(Type::string()))),
                    'resolve' => static function (AbstractProduct $product, array $args, array $context) : array {
                        return $context['galleryService']->getByProductId($product->getId());
                    }
                ],
                'prices' => [
                    'type' => Type::nonNull(Type::listOf(Type::nonNull($priceType))),
                    'resolve' => static function (AbstractProduct $product, array $args, array $context) : array {
                        return $context['priceService']->getByProductId($product->getId());
                    }
                ],
            ],
            'resolveField' => static fn (AbstractProduct $product, array $args, $context, $info) => 
                match ($info->fieldName) {
                    'id' => $product->getId(),
                    'name' => $product->getName(),
                    'inStock' => $product->isInStock(),
                    'description' => $product->getDescription(),
                    'brand' => $product->getBrand(),
                    'category' => $product->getCategory(),
                    default => null,
                },
        ]);
    }
}