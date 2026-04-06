import { useContext } from "react";

import ShoppingCartButton from "../UI/buttons/ShoppingBag";
import CategoryNav from "./CategoryNav";

import CartContext from "../../store/contexts/CartContext.jsx";
import CartButton from "../UI/buttons/CartButton.jsx";

export default function MainNavigation() {
    const {
        openCart,
    } = useContext(CartContext);

    const handleOpenCart = () => {
        openCart();
    }


    return (
        <header className="fixed top-0 left-0 right-0 z-45 bg-white">
            <div className="flex justify-between items-center container mx-auto p-5">
                <CategoryNav />
                <ShoppingCartButton  />
                <CartButton
                    data-testid="cart-btn"
                    onClick={handleOpenCart}    
                />             
            </div>            
        </header>
    );
}