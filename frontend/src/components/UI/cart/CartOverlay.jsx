import { useContext } from "react";

import CartContext from "../../../store/contexts/CartContext.jsx";

import IncreaseButton from "../buttons/IncreaseButton.jsx";
import DecreaseButton from "../buttons/DecreaseButton.jsx";
import CartImage from "../cart/CartImage.jsx";
import CartItem from "./CartItem.jsx";

import { getTotalPrice, getTotalQuantity } from "../../../helper/cart.jsx";

export default function CartOverlay() {
    const {items, isOpen, closeCart} = useContext(CartContext);

    const totalPrice = getTotalPrice(items);
    const totalQuantity = getTotalQuantity(items);

    if(!isOpen) return null;

    console.log(totalPrice);
    console.log(totalQuantity);

    return (
        <>
            <div 
                className="fixed insest-0 bg-black/40 z-40"
                onClick={closeCart}
            ></div>
            <div className="fixed top-20 right-15 w-[500px] bg-white shadow-xl z-50 p-4">
                <h1 className="text-2xl font-bold mb-4">My Bag</h1>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <CartItem items={items} />
                )}
            </div>
        </>
    );
}