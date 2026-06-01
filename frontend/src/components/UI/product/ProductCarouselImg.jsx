export default function ProductCarouselItem({image, index}) {

    return (
        <div className="relative w-full h-full">
            <img 
                src={image} 
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
                />
        </div>
    );
}