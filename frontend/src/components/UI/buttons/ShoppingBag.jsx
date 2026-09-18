import {ShoppingBagIcon} from "@heroicons/react/24/solid";

export default function ShoppingBag() {
    return (
        <button className="relative p-2 cursor-pointer">
            <ShoppingBagIcon className="h-6 w-6 lg:h-8 lg:w-8 text-green-500" />
        </button>
    );
}