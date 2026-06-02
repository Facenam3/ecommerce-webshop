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
                className="fixed top-20 right-40 w-[420px] max-h-[64vh] bg-white shadow-xl z-50 px-4 py-6 flex flex-col"
                data-testid="cart-overlay"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="shrink-0 text-md font-bold mb-4">
                    My Bag,{" "}
                    <span className="font-normal">
                        {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                    </span>
                </h2>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    {items.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <CartItem items={items} />
                    )}
                </div>

                <div className="shrink-0 bg-white pt-4">
                    <div
                        className="py-4 px-1 flex justify-between font-bold text-md"
                        data-testid="cart-total"
                    >
                        <h2 className="capitalize">total</h2>
                        <p>
                            {items[0]?.price?.symbol ?? "$"}{" "}
                            {Number(totalPrice).toFixed(2)}
                        </p>
                    </div>

                    <PlaceOrder />
                </div>
            </div>
        </>
    );
}