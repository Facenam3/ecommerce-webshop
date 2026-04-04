import { useContext } from "react";

import CartContext from "../../../store/contexts/CartContext";
import CartIcon from "./CartIcon.jsx";

import {getTotalQuantity} from "../../../helper/cart.js";

export default function CartButton({ onClick, ...props}) {
    const { items } = useContext(CartContext);

    const totalQuantity = getTotalQuantity(items);

    return (
        <button 
            className="relative p-2 cursor-pointer"
            data-testid="cart-btn"
            onClick={onClick}
            {...props}
        >
            <CartIcon />

            {totalQuantity > 0 && (
                <span className="absolute top-0.5 -right-1 bg-black text-white text-xs rounded-full px-2 py-1">
                    {totalQuantity}
                </span>
            )}
        </button>
    );  
}