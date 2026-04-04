import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartIcon({...props}) {
    return (
            <ShoppingCartIcon 
                className="h-8 w-8" 
                {...props}
            />
    );
}