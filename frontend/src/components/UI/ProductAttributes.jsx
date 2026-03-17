export default function ProductAttributes({attributeName, items, attributeType, ...props}) {
    return (
        <div className="attributes">
            <p className="font-semibold text-xl uppercase mb-3">{attributeName}:</p>
            <div className="flex gap-2 mb-3">
                {
                   items?.map((item) => {
                        return (
                            attributeType === 'swatch' ? (
                                <button
                                    {...props}
                                    key={item.id}
                                    className="w-10 h-10 border-2 cursor-pointer"
                                    style={{ backgroundColor: item.value }}
                                ></button>
                            ) : (
                                <button 
                                    {...props}
                                    key={item.id}
                                    className="px-2 py-3 border-2 w-16 cursor-pointer hover:bg-gray-950 hover:text-white text-center"
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