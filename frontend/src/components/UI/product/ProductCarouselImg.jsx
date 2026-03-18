export default function ProductCarouselItem({image}) {

    return (
        <div className="relative w-full h-full">
            <img 
                src={image} 
                alt='product' 
                className="w-full h-full object-contain"
                />
        </div>
    );
}