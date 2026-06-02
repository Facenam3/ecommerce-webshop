import {Link} from "react-router-dom";

import {ShoppingBagIcon} from "@heroicons/react/24/solid"

export default function ShoppingBag() {
    return (
        <Link 
            className="relative p-2 cursor-pointer"
            to="/all"
            >
            <ShoppingBagIcon className="h-10 w-10 text-green-500" />
        </Link>
    );
}