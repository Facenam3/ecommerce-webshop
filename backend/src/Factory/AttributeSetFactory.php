<?php

declare(strict_types=1);

namespace App\Factory;

use App\Model\Attribute\AbstractAttributeSet;
use App\Model\Attribute\SwatchAttributeSet;
use App\Model\Attribute\TextAttributeSet;
use App\Model\Attribute\AttributeItem;

final class AttributeSetFactory {
    private array $map = [
        "text" => TextAttributeSet::class,
        "swatch" => SwatchAttributeSet::class,
    ];


    public function make(
        string $type,
        string $id,
        string $name,
        array $items
    ) : AbstractAttributeSet {
        $class = $this->map[$type] ?? TextAttributeSet::class;
        return new $class($id, $name, $items);
    }
}