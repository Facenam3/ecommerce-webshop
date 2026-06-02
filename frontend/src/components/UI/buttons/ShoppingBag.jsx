import { useNavigate } from "react-router-dom";

import {ShoppingBagIcon} from "@heroicons/react/24/solid"

export default function ShoppingBag() {
    const navigate = useNavigate();

    return (
        <button
            type="button" 
            className="relative p-2 cursor-pointer"
            onClick={() => navigate("/all")}
            aria-label="Go to all products"
            >
            <ShoppingBagIcon className="h-10 w-10 text-green-500" />
        </button>
    );
}