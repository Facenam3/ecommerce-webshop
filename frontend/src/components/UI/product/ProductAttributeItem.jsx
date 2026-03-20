import AttributeOption from "../product/AttributeOption.jsx";

export default function ProductAttributes({
    attributeName, 
    items, 
    attributeType, 
    selectedValue,
    onSelect
}) {
    return (
        <div className="attributes">
            <p className="font-semibold text-xl uppercase mb-3">{attributeName}:</p>
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
                            />               
                        );                            
                    })
                }                   
            </div>                        
        </div>
    );
}