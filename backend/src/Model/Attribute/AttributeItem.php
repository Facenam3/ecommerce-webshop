<?php 

declare(strict_types=1);

namespace App\Model\Attribute;

final class AttributeItem {
    
    public function __construct(
        private string $id,
        private string $displayValue,
        private string $value
    ){}

    public function getId(): string 
    {
        return $this->id;
    }

    public function getDisplayValue(): string 
    {
        return $this->displayValue;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'displayValue' => $this->displayValue,
            'value' => $this->value,
        ];
    }
}