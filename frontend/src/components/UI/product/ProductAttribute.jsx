import AddToCart from "../buttons/AddToCart";
import ProductAttributes  from "./ProductAttributeItem.jsx";

import parse from "html-react-parser";

export default function ProductAttribute({product}) {
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
                            />
                        );
                    })                     
                }   
                <h2 className="font-semibold text-xl mb-2 uppercase">Price:</h2>
                <p className="font-bold text-3xl">{product.prices[0].currency.symbol} {product.prices[0].amount}</p>
                <AddToCart />
                {product.description && (
                    <div className="mt-6 text-md leading-7 text-gray-700">
                        {parse(product.description)}
                    </div>
                )}
        </div>
    );
}