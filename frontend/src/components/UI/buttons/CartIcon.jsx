import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartIcon({...props}) {
    return (
            <ShoppingCartIcon 
                className="h-6 w-6 lg:h-8 lg:w-8" 
                {...props}
            />
    );
}