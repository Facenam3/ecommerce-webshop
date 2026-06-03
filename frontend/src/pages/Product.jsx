import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
        addItemToCart,
    } = useContext(CartContext);

    const [selectedAttributes, setSelectedAttributes] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                await fetchProductById(id);
            } catch (error) {
                console.log(error);
            }
        }

        if(id) {
            fetchProduct();
        }
       
    }, [id]);

    const productId = product?.id ?? null;

    useEffect(() => {
        if(!productId) return;
        setSelectedAttributes({});
    }, [productId])

    const requiredAttributes = product?.attributes ?? [];

    const isConfigComplete = requiredAttributes.every(
        (attribute) => selectedAttributes[attribute.name]
    );

    const isInStock = product?.inStock;
    const isAddToCartDisabled = !isConfigComplete || !isInStock;
    

    const handleAddToCart = () => {
        if(!product || isAddToCartDisabled) return;

         const cartItem = {
            productId: product.id,
            name: product.name,
            brand: product.brand,
            image: product.gallery[0] ?? "",
            price: {
                amount: Number(product.prices[0].amount ?? 0),
                symbol: product.prices[0].currency.symbol ?? "$",
            },
            attributes: product.attributes ?? [],
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
    if(!product) {
        return (
            <div className="text-center mt-30">
                <h2 className="text-2xl font-semibold">There is no product with this name.</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-10 mt-20">
            <div className="my-5 flex gap-5 p-10">
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