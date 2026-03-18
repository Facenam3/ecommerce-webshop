export default function PreviousButton({...props}) {
    return (
        <button 
            {...props}
            type="button"
            className="w-full h-full object-contain"
            aria-label="Previous Image"
        >
            <span></span>
        </button>
    );
}