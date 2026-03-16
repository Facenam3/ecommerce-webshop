export default function Card({product}) {

    const cardClasses = "w-5/6 p-3 mb-5 hover:shadow-lg ";
    const imgClasses = "w-full h-[500px] p-1 mb-2 hover:bg-gray-50";
    const priceClasses = "text-gray-900";
    return (
        <div 
            className={cardClasses}
            data-testid={`product-${product.name}`}
        >
            <div className={imgClasses}>

                <img className="w-full h-full object-cover " src={product.gallery[0]} alt={product.name} />
            </div>
            <div className="card-body p-1">
                <h3 className="text-gray-500 mb-1">{product.name}</h3>
                <p className={priceClasses}>{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
            </div>
        </div>
    );
}