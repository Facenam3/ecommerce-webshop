<?php

declare(strict_types=1);

namespace App\GraphQL\Types;

final class Types {
    private static ?ProductType $product = null;
    private static ?CategoryType $category = null;
    private static ?PriceType $price = null;
    private static ?CurrencyType $currency = null;
    private static ?AttributeSetType $attributeSet = null;
    private static ?AttributeItemType $attributeItem = null;

    public static function product() : ProductType {
        return self::$product ??= new ProductType();
    }
    public static function category() : categoryType {
        return self::$category ??= new categoryType();
    }
    public static function price() : priceType {
        return self::$price ??= new priceType();
    }
    public static function currency() : currencyType {
        return self::$currency ??= new currencyType();
    }
    public static function attributeSet() : attributeSetType {
        return self::$attributeSet ??= new attributeSetType();
    }
    public static function attributeItem() : AttributeItemType {
        return self::$attributeItem ??= new AttributeItemType();
    }
}