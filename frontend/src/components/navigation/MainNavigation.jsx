import { useContext, useEffect } from "react";

import CartIcon from "../UI/buttons/CartIcon";
import CartButton from "../UI/buttons/ShoppingBag";
import CategoryNav from "./CategoryNav";

import CartContext from "../../store/contexts/CartContext.jsx";

export default function MainNavigation() {
    const {
        items,
        openCart,
    } = useContext(CartContext);

    const handleOpenCart = () => {
        openCart();
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-45 bg-white">
            <div className="flex justify-between items-center container mx-auto p-5">
                <CategoryNav />
                <CartButton />
                <CartIcon
                    onClick={handleOpenCart}
                    items={items}
                />
            </div>            
        </header>
    );
}