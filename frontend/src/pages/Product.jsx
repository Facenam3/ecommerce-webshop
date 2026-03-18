import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductContext from "../store/contexts/ProductContext";
import ProductCarousel from "../components/UI/product/ProductCarousel";
import ProductAttribute from "../components/UI/product/ProductAttribute";

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

    if(loading) return <div>Loading...</div>;
    if(errors) return <div>Failed to fetch product..</div>;
    if(!product) return <div>No product found.</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="my-5 flex gap-5">
                <div className="w-5/6 p-5">
                   <ProductCarousel
                        items={product.gallery}
                   />
                </div>
                <div className="w-2/5">
                    <ProductAttribute product={product} />
                </div>
            </div>
        </div>
    );
}