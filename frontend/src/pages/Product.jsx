import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import ProductCarousel from "../components/UI/product/ProductCarousel.jsx";
import ProductDetails from "../components/UI/product/ProductDetails.jsx";

import ProductContext from "../store/contexts/ProductContext.jsx";
import CartContext from "../store/contexts/CartContext.jsx";

export default function Product() {
    const { 
        product,
        loading,
        errors,
        fetchProductById,
    } = useContext(ProductContext);
    const {
        items,
        addItemToCart,
    } = useContext(CartContext);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const { id } = useParams();

    const location = useLocation();
    const categoryName = location.state?.categoryName;

    useEffect(() => {
        async function fetchProduct() {
            try {
                await fetchProductById(id);
            } catch (error) {
                console.log(error);
            }
        }

        fetchProduct();
    }, [id]);

    console.log(items);

    const isConfigComplete = 
        (product?.attributes?.length || 0) === Object.keys(selectedAttributes).length;
    
    const isAddToCartDisabled = !isConfigComplete;

    const handleAddToCart = () => {
        if(!product || isAddToCartDisabled) return;

         const cartItem = {
            productId: product.id,
            name: product.name,
            brand: product.brand,
            image: product.gallery[0],
            price: {
                amount: Number(product.prices[0].amount),
                symbol: product.prices[0].currency.symbol,
            },
            attributes: product.attributes,
            selectedAttributes: {...selectedAttributes},
            quantity: 1,
        };

        addItemToCart(cartItem);
    }

    const handleAttributeSelect = (attributeName, itemValue) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attributeName]: itemValue,
        }));
    };

    if(loading) return <div>Loading...</div>;
    if(errors) return <div>Failed to fetch product..</div>;
    if(!product) return <div>No product found.</div>;

    return (
        <div className="container mx-auto p-6">
            {categoryName && (
                <h1 className="capitalize text-3xl my-4">{categoryName}</h1>
            )}
            <div className="my-5 flex gap-5">
                <div className="w-5/6 p-5">
                   <ProductCarousel
                        items={product.gallery}
                   />
                </div>
                <div className="w-2/5">
                    <ProductDetails 
                        product={product}
                        selectedAttributes={selectedAttributes}
                        onAttributeSelect={handleAttributeSelect}
                        isAddToCartDisabled={isAddToCartDisabled}
                        onAddToCart={handleAddToCart}
                    />
                </div>
            </div>
        </div>
    );
}