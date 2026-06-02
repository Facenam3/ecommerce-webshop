export default function DecreaseButton({onClick, ...props}) {
    return (
        <button 
            onClick={onClick}
            {...props}
            type="button"
            className="w-6 h-6 border-2 flex justify-center items-center"
        >
            <i className="fa-solid fa-minus"></i>
        </button>
    );
}