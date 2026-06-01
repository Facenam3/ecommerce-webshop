import QuickShopButton from "./buttons/QuickShopButton";

export default function Card({ product, onQuickShop, ...props }) {
    const cardClasses = "group w-6/7 p-4 mb-5 hover:shadow-lg";
    const imgClasses = "w-full aspect-[4/5] mb-2 bg-white hover:bg-gray-50 relative flex items-center justify-center";
    const priceClasses = "text-gray-900 font-semibold";

    const outOfStockCard = (
        <div
            className={cardClasses}
            {...props}
        >
            <div className={imgClasses}>
                <img
                    className="w-full h-full object-contain"
                    src={product.gallery[0]}
                    alt={product.name}
                />
                <div className="absolute inset-0 bg-white/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="uppercase text-gray-500 text-3xl">
                        out of stock
                    </h3>
                </div>
            </div>

            <div className="card-body p-1">
                <h3 className="text-gray-500 mb-1">{product.name}</h3>
                <p className="text-gray-400 font-semibold">
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                </p>
            </div>
        </div>
    );

    return product.inStock ? (
        <div
            className={cardClasses}
            {...props}
        >
            <div className={imgClasses}>
                <img
                    className="w-full h-full object-cover"
                    src={product.gallery[0]}
                    alt={product.name}
                />
                <div className="absolute bottom-[-15px] right-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <QuickShopButton 
                        onClick={onQuickShop}
                    />
                </div>
            </div>

            <div className="card-body p-1">
                <h3 className="text-gray-500 mb-1">{product.name}</h3>
                <p className={priceClasses}>
                    {product.prices[0].currency.symbol}
                    {product.prices[0].amount}
                </p>
            </div>
        </div>
    ) : (
        outOfStockCard
    );
}