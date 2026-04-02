import { useContext } from "react";

import CartContext from "../../../store/contexts/CartContext.jsx";

import { createOrder } from "../../../api/order.js";

export default function PlaceOrder() {
    const {items, closeCart} = useContext(CartContext);

    const isDisabled = items.length === 0;

    const handlePlaceOrder = async () => {
        if(isDisabled) return;

        const payload = {
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                selectedAttributes: item.attributes.map(attribute => {
                    const selectedValue = item.selectedAttributes[attribute.name];
                    const selectedItem = attribute.items.find(
                        attrItem => attrItem.value === selectedValue
                    );

                    if(!selectedItem) return null;

                    return {
                        attributeId: attribute.id,
                        itemId: selectedItem.id,
                    };
                })
                .filter(Boolean),
            })),
        };

        try {
            await createOrder(payload);

            closeCart();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button 
            onClick={handlePlaceOrder}
            disabled={isDisabled}
            type="button"
            className={`w-full px-5 py-6 uppercase text-xl ${
                isDisabled ? 'bg-gray-500 text-white cursor-not-allowed opacity-60'
                : "bg-green-400 text-white hover:bg-green-500 cursor-pointer"
            }`}
        >
            place order
        </button>
    );
}