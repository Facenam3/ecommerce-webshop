import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import parse from "html-react-parser";

import ProductContext from "../store/contexts/ProductContext";
import ProductAttributes from "../components/UI/ProductAttributes";
import AddToCart from "../components/UI/buttons/AddToCart";
import ProductImage from "../components/UI/ProductImage";

export default function Product() {
    const { 
        product,
        loading,
        errors,
        fetchProductById,
    } = useContext(ProductContext);

    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                await fetchProductById(id);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
    }, []);

    console.log(product);

    if(loading) return <div>Loading...</div>;
    if(errors) return <div>Failed to fetch product..</div>;
    if(!product) return <div>No product found.</div>;

    return (
        <div className="container mx-auto p-6">
            <h1>{product?.name}</h1>
            <div className="my-5 flex gap-5">
                <div className="w-1/6 p-5">
                    {
                        product.gallery?.map((item) => {
                            return (
                                <ProductImage 
                                    item={item}
                                />
                            );
                        })
                    }
                </div>
                <div className="w-3/5  bg-red-400 p-5"></div>
                <div className="w-2/5">
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
            </div>
        </div>
    );
}