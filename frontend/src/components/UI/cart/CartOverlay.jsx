import { useContext } from "react";

import CartContext from "../../../store/contexts/CartContext.jsx";

export default function CartOverlay() {
    const {items, isOpen, closeCart} = useContext(CartContext);

    if(!isOpen) return null;

    return (
        <>
            <div 
                className="fixed insest-0 bg-black/40 z-40"
                onClick={closeCart}
            ></div>
            <div className="fixed top-20 right-10 w-[400px] bg-white shadow-xl z-50 p-6">
                <h1 className="text-2xl font-bold mb-4">My Bag</h1>
                {items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {items.map((item,index) => (
                            <div key={index} className="border-b pb-4 flex">
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl text-gray-600">{item.name}</h2>
                                    <p>
                                        {item.price.symbol}
                                        {Number(item.price.amount).toFixed(2)}
                                    </p>
                                    <p>

                                    </p>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <button>+</button>
                                    <p>{item.quantity}</p>
                                    <button>-</button>
                                </div>
                                <div>
                                    <img src={item.gallery} alt={item.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}