export default function DecreaseButton({onClick, ...props}) {
    return (
        <button 
            onClick={onClick}
            {...props}
            type="button"
            className="w-8 h-8 border-2 px-1 py-1"
        >
            <i className="fa-solid fa-minus"></i>
        </button>
    );
}