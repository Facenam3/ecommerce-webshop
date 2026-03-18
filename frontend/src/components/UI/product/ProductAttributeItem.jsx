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
                            attributeType === 'swatch' ? (
                                <button
                                    key={item.id}
                                    className={`w-10 h-10 border-2 ${
                                        selectedValue === item.value
                                            ? "ring-2 ring-black"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: item.value }}
                                    onClick={() => onSelect(attributeName, item.value)}
                                ></button>
                            ) : (
                                <button 
                                    key={item.id}
                                    className={`px-2 py-3 border-2 w-16 text-center cursor-pointer ${
                                        selectedValue === item.value
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-950 hover:text-white"
                                    }`}
                                    onClick={() => onSelect(attributeName, item.value)}
                                >
                                    <p>{item.value}</p>
                                </button>
                            )                            
                        );                            
                    })
                }                   
            </div>                        
        </div>
    );
}