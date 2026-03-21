import CartIcon from "../UI/buttons/CartIcon";
import CartButton from "../UI/buttons/ShoppingBag";
import CategoryNav from "./CategoryNav";

export default function MainNavigation() {
    return (
        <header className="fixed top-0 left-0 right-0 z-45 bg-white shadow-sm">
            <div className="flex justify-between items-center container mx-auto p-5">
                <CategoryNav />
                <CartButton />
                <CartIcon />
            </div>            
        </header>
    );
}