import { toKebabCase } from "../../../helper/string";

export default function AttributeOption({
    attributeName,
    attributeType, 
    selectedValue,
    item,
    onSelect,
    variant
}) {
    const isSelected = selectedValue === item.value;

    const kebabAttribute = toKebabCase(attributeName);
    const optionValue = item.value || item.displayValue;

    let testId;

    if(variant === "cart") {
        const kebabValue = toKebabCase(optionValue);
        const baseTestId = `cart-item-attribute-${kebabAttribute}-${kebabValue}`;

        testId = isSelected ? `${baseTestId}-selected` : baseTestId;
    }

    if(variant === "pdp") {
        testId = `product-attribute-${kebabAttribute}-${optionValue}`;
    }

    const swatchSize = 
        variant === 'cart' ? 'w-6 h-6 text-xs' : 'w-10 h-10 text-base';

    const textSize = 
        variant === 'cart'
            ? 'px-2 py-1 w-* text-xs' 
            : 'px-2 py-3 w-16 text-base cursor-pointer';

    if(attributeType === 'swatch'){
        return (
            <button
                type="button"
                data-testid={testId}
                className={`${swatchSize} border-2 ${
                    isSelected ? "ring-2 ring-black"
                        : ""
                }`}
                style={{ backgroundColor: item.value}}
                onClick={() => onSelect?.(attributeName, item.value)}
                disabled={variant === 'cart'}
            >
            </button>
        );
    }

    return (
        <button
            type="button"
            data-testid={testId}
            className={`${textSize} border-2 text-center ${
                isSelected ? "bg-black text-white"
                    : variant !== 'cart' 
                    ? "hover:bg-gray-950 hover:text-white"
                    : ""
            }`}
            onClick={() => onSelect?.(attributeName, item.value)}
            disabled={variant === 'cart'}
        >
            {item.value}
        </button>
    );
}