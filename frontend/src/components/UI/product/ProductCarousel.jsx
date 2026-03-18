import { useState } from "react";
import ProductCarouselItem from "./ProductCarouselImg";
import PreviousButton from "../buttons/PreviousButton";
import NextButton from "../buttons/NextButton";

export default function ProductCarousel({items = []}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if(!items.length) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center bg-gray-100">
                <div className="text-gray-500">No images available.</div>
            </div>
        );
    }

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => {
           return prevIndex === 0 ? items.length - 1 : prevIndex - 1
        });
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => {
           return prevIndex === items.length - 1 ? 0 : prevIndex + 1
        });
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="w-full flex">
            <div className="w-1/5">
            {items.length > 1 && (
                <div className="mt-4 flex gap-3 flex-wrap flex-col">
                    {items.map((image,index) => (
                        <button 
                            key={image}
                            type='button'
                            onClick={() => goToSlide(index)}
                            className={`w-20 h-20 border-2 overflow-hidden cursor-pointer ${
                                currentIndex === index
                                    ? "border-black"
                                    : "border-gray-200"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                        >
                            <ProductCarouselItem
                                image={image}
                                index={index + 1}
                            />
                        </button>
                    ))}
                </div>
            )}</div>
            <div className="relative w-4/5 h-[600px] bg-white overflow-hidden">
                <ProductCarouselItem
                    image={items[currentIndex]}
                    index={currentIndex}
                />
                {items.length > 1 && (
                    <>
                        <PreviousButton
                            onClick={goToPrevious}
                        />
                        <NextButton 
                            onClick={goToNext}
                        />
                    </>
                )}
            </div>            
        </div>
    );
}