export default function AddToCart({...props}){
    return (
        <button 
            {...props} 
            className="w-full px-5 py-6 uppercase text-white bg-green-400 text-xl my-4 cursor-pointer"
        >
            add to cart
        </button>
    );
}