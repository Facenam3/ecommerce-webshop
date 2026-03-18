export default function AddToCart({onClick, disabled, ...props}){
    return (
        <button 
            {...props}
            onClick={onClick}
            disabled={disabled} 
            className="w-full px-5 py-6 uppercase text-white bg-green-400 text-xl my-4 cursor-pointer"
        >
            add to cart
        </button>
    );
}