import AttributeOption from "../product/AttributeOption.jsx";

import { toKebabCase } from "../../../helper/string.js";

export default function ProductAttributes({
    attributeName, 
    items, 
    attributeType, 
    selectedValue,
    onSelect
}) {
    return (
        <div 
            className="attributes"
            data-testid={`product-attribute-${toKebabCase(attributeName)}`}    
        >
            <p className="font-bold text-sm uppercase mb-3">{attributeName}:</p>
            <div className="flex gap-2 mb-3">
                {
                   items?.map((item) => {
                        return (
                            <AttributeOption
                                key={item.id}
                                attributeName={attributeName}
                                attributeType={attributeType}
                                selectedValue={selectedValue}
                                item={item}
                                onSelect={onSelect}
                                variant='pdp'
                            />               
                        );                            
                    })
                }                   
            </div>                        
        </div>
    );
}