export default function DecreaseButton({onClick}) {
    return (
        <button 
            onClick={onClick}
            type="button"
            className="w-8 h-8 border-2 px-1 py-1"
        >
            <i className="fa-solid fa-minus"></i>
        </button>
    );
}