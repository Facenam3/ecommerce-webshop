import { useContext, useState } from "react";

import CartContext from "../../../store/contexts/CartContext.jsx";

import { createOrder } from "../../../api/order.js";

export default function PlaceOrder() {
    const {items, clearCart, closeCart} = useContext(CartContext);
    const [ loading, setLoading ] = useState(false);

    const isDisabled = items.length === 0 || loading;

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
            setLoading(true);
            await createOrder(payload);
            clearCart();
            closeCart();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button 
            onClick={handlePlaceOrder}
            disabled={isDisabled}
            type="button"
            className={`w-full py-3 uppercase text-md font-semibold ${
                isDisabled
                    ? 'bg-gray-500 text-white cursor-not-allowed opacity-60'
                    : loading
                    ? 'bg-green-300 text-white cursor-not-allowed'
                    : 'bg-green-400 text-white hover:bg-green-500 cursor-pointer'
            }`}
        >
            {loading ? "placing order...." : "place order"}
        </button>
    );
}