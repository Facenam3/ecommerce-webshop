import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function QuickShopButton() {
    return (
        <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <ShoppingCartIcon className="h-6 w-6 text-white" />
        </div>
    );
}