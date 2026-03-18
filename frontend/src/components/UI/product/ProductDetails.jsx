import AddToCart from "../buttons/AddToCart.jsx";
import ProductAttributes  from "./ProductAttributeItem.jsx";

import parse from "html-react-parser";

export default function ProductDetails({
    product,
    selectedAttributes,
    onAttributeSelect,
    isAddToCartDisabled,
    onAddToCart
}) {
    return(
        <div className="w-full">
            <h2 className="font-semibold text-3xl mb-2">{product?.name}</h2>
                {
                    product.attributes?.map((item)=> {
                        return (
                            <ProductAttributes
                                key={item.id}
                                attributeName={item.name}
                                attributeType={item.type}
                                items={item.items} 
                                selectedValue={selectedAttributes[item.name]}
                                onSelect={onAttributeSelect}
                            />
                        );
                    })                     
                }   
                <h2 className="font-semibold text-xl mb-2 uppercase">Price:</h2>
                <p className="font-bold text-3xl">
                    {product.prices[0].currency.symbol}
                    {Number(product.prices[0].amount).toFixed(2)}
                    </p>
                <AddToCart 
                    disabled={isAddToCartDisabled}
                    onClick={onAddToCart}
                    data-testid="add-to-cart"
                />
                {product.description && (
                    <div 
                        className="mt-6 text-md leading-7 text-gray-700"
                        data-testid="product-description"
                    >
                        {parse(product.description)}
                    </div>
                )}
        </div>
    );
}