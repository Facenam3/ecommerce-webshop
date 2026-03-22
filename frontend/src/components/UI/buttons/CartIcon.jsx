import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartIcon({items, ...props}) {
    return (
        <button 
            className="relative p-2 cursor-pointer"
            {...props} 
            items={items}   
        >
            <ShoppingCartIcon className="h-8 w-8" />
        </button>
    );
}