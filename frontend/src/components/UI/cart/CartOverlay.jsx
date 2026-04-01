import { useContext, useEffect } from "react";

import CartContext from "../../../store/contexts/CartContext.jsx";
import CartItem from "./CartItem.jsx";
import PlaceOrder from "../buttons/PlaceOrder.jsx";

import { getTotalPrice, getTotalQuantity } from "../../../helper/cart.js";

export default function CartOverlay() {
    const {items, isOpen, closeCart} = useContext(CartContext);

    const totalPrice = getTotalPrice(items);
    const totalQuantity = getTotalQuantity(items);

    useEffect(() => {
        const handleEsc = (e) => {
            if(e.key === "Escape") {
                closeCart();
            }
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };

    }, [closeCart]);

    if(!isOpen) return null;

    return (
        <>
            <div 
                className="fixed top-20 left-0 right-0 bottom-0 bg-black/40 z-40"
                onClick={closeCart}
            />
            <div 
                className="fixed top-20 right-10 w-[440px] bg-white shadow-xl z-50 p-4 flex flex-col"
                onClick={(e) => e.stopPropagation()}
                >
                <h2 className="text-xl font-bold mb-4">
                    My Bag, <span className="font-normal">{totalQuantity} items</span>
                </h2>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="max-h-[60vh] overflow-y-auto">
                        <CartItem items={items} />
                    </div>                    
                )}
                <div 
                    className="py-8 px-1 flex justify-between font-bold text-xl"
                    data-testid="cart-total"    
                >
                    <h2 className="capitalize">total</h2>
                    <p>{items[0]?.price?.symbol ?? "$"} {Number(totalPrice).toFixed(2)}</p>
                </div>
                <PlaceOrder />                
            </div>
        </>
    );
}