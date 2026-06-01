export default function NextButton({...props}) {
    return (
        <button
            {...props} 
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white hover:bg-black/80 px-3 py-2 shadow cursor-pointer"
            aria-label="Next Image"
        >
            <i className="fa-solid fa-chevron-left"></i>
        </button>
    );
}