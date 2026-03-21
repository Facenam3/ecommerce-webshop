export default function CartImage({image, name}) {
    return (
        <div className="w-35 h-40">
            <img  
                src={image} 
                alt={name}
                className="w-full h-full object-cover"
            />
        </div>
    );
}   