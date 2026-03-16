import CartIcon from "../UI/buttons/CartIcon";
import CartButton from "../UI/buttons/ShoppingBag";
import CategoryNav from "./CategoryNav";

export default function MainNavigation() {
    return (
        <header>
            <div className="flex justify-between items-center container mx-auto p-5">
                <CategoryNav />
                <CartButton />
                <CartIcon />
            </div>            
        </header>
    );
}