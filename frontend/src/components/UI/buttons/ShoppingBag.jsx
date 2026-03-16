import {ShoppingBagIcon} from "@heroicons/react/24/solid";

export default function ShoppingBag() {
    return (
        <button className="relative p-2 cursor-pointer">
            <ShoppingBagIcon className="h-8 w-8 text-green-500" />
        </button>
    );
}