<?php

declare(strict_types=1);

namespace App\Model\Attribute;

abstract class AbstractAttributeSet {
    protected array $items;

    public function __construct(
        protected string $id,
        protected string $name,
        array $items = []
    )
    {
        $this->items = $items;
    }

    abstract public function getType() : string;

    public function getId(): string 
    {
        return $this->id;
    }

    public function getItems() : array
    {
        return $this->items;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->getType(),
            'items' => array_map(
                fn(AttributeItem $i) => $i->toArray(), $this->items
            ),
        ];
    }
}