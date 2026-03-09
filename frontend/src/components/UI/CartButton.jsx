import {ShoppingBagIcon} from "@heroicons/react/24/outline";

export default function CartButton() {
    return (
        <button className="relative p-2">
            <ShoppingBagIcon className="h-6 w-6 text-green-500" />
        </button>
    );
}