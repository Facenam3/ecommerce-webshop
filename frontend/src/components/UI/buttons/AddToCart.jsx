export default function AddToCart({onClick, disabled, ...props}){
    return (
        <button 
            {...props}
            onClick={onClick}
            disabled={disabled} 
            className={`w-full px-5 py-6 uppercase text-md font-semibold my-4 ${
                disabled ? 'bg-gray-500 text-white cursror-not-allowed opacity-60'
                : 'bg-green-400 text-white hover:bg-green-500 cursor-pointer'
            }`}
        >
            add to cart
        </button>
    );
}