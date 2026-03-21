export default function AttributeOption({
    attributeName,
    attributeType, 
    selectedValue,
    item,
    onSelect,
    variant
}) {
    const isSelected = selectedValue === item.value;

    const swatchSize = 
        variant === 'cart' ? 'w-6 h-6 text-xs' : 'w-10 h-10 text-base';

    const textSize = 
        variant === 'cart'
            ? 'px-2 py-1 w-* text-xs' 
            : 'px-2 py-3 w-16 text-base';

    if(attributeType === 'swatch'){
        return (
            <button
                type="button"
                className={`${swatchSize} border-2 ${
                    isSelected ? "ring-2 ring-black"
                        : ""
                }`}
                style={{ backgroundColor: item.value}}
                onClick={() => onSelect?.(attributeName, item.value)}
            >
            </button>
        );
    }

    return (
        <button
            type="button"
            className={`${textSize} border-2 text-center cursor-pointer ${
                isSelected ? "bg-black text-white"
                    : "hover:bg-gray-950 hover:text-white"
            }`}
            onClick={() => onSelect?.(attributeName, item.value)}
        >
            {item.value}
        </button>
    );
}