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

    private static ?OrderType $order = null;
    private static ?MutationType $mutation = null;
    private static ?OrderItemType $orderItem = null;
    private static ?SelectedAttributeType $selectedAttribute = null;

    private static ?CreateOrderInputType $createOrderInput = null;
    private static ?OrderItemInputType $orderItemInput = null;
    private static ?SelectedAttributeInputType $selectedAttributeInput = null;

    public static function product() : ProductType {
        return self::$product ??= new ProductType();
    }
    public static function category() : CategoryType {
        return self::$category ??= new CategoryType();
    }
    public static function price() : PriceType {
        return self::$price ??= new PriceType();
    }
    public static function currency() : CurrencyType {
        return self::$currency ??= new CurrencyType();
    }
    public static function attributeSet() : AttributeSetType {
        return self::$attributeSet ??= new AttributeSetType();
    }
    public static function attributeItem() : AttributeItemType {
        return self::$attributeItem ??= new AttributeItemType();
    }

    public static function order() : OrderType {
        return self::$order ??= new OrderType();
    }

    public static function mutation() : MutationType {
        return self::$mutation ??= new MutationType();
    }

    public static function selectedAttributeInput() : SelectedAttributeInputType {
        return self::$selectedAttributeInput ??= new SelectedAttributeInputType();
    }

    public static function orderItemInput() : OrderItemInputType {
        return self::$orderItemInput ??= new OrderItemInputType();
    }

    public static function createOrderInput() : CreateOrderInputType {
        return self::$createOrderInput ??= new CreateOrderInputType();
    }

    public static function orderItem() : OrderItemType {
        return self::$orderItem ??= new OrderItemType();
    }

    public static function selectedAttribute() : SelectedAttributeType {
        return self::$selectedAttribute ??= new SelectedAttributeType();
    }
}