import AttributeOption from "../product/AttributeOption.jsx";
import IncreaseButton from "../buttons/IncreaseButton.jsx";
import DecreaseButton from "../buttons/DecreaseButton.jsx";
import CartImage from "./CartImage.jsx";

export default function CartItem({items}) {
    return (
        <div className="flex flex-col gap-2 items-center">
            {items.map((item,index) => (
                <div 
                    key={index} 
                    className="flex justify-between gap-4"
                >
                    <div  className="flex flex-col gap-2 flex-1 p-1">
                        <h2 className="text-xl text-gray-600">{item.name}</h2>
                        <p>
                            {item.price.symbol}
                            {Number(item.price.amount).toFixed(2)}
                        </p>
                        {item.attributes.map((attribute) => {
                            const selectedValue = 
                                item.selectedAttributes[attribute.name];
                            
                            return (
                                <div key={attribute.id}>
                                    <h4 className="text-md mb-2">{attribute.name}</h4>

                                    <div className="flex gap-2 items-center mb-1">
                                        {attribute.items.map((attrItem) => (
                                            <AttributeOption 
                                                key={attrItem.id}
                                                attributeName={attribute.name}
                                                attributeType={attribute.type}
                                                selectedValue={selectedValue}
                                                item={attrItem}
                                                variant='cart'
                                            />
                                        ))}
                                    </div>                                
                                </div>
                            )
                        })}
                        
                    </div> 
                    <div className="flex flex-col justify-between items-center py-4">
                        <IncreaseButton />
                        <p>{item.quantity}</p>
                        <DecreaseButton />
                    </div>
                    <div className="justify-end">
                         <CartImage
                            image={item.image}
                            name={item.name}
                        />
                    </div>                   
                </div>                               
            ))}
        </div>
    );
}