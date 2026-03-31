import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryContext from "../store/contexts/CategoryContext.jsx";
import ProductContext from "../store/contexts/ProductContext.jsx";
import Card from "../components/UI/Card.jsx";

import { toKebabCase } from "../helper/string.js";

export default function ProductsPage() {
    const {
        categories,
    } = useContext(CategoryContext);

    const { 
        products, 
        loading: loadingProducts, 
        errors: errorsProducts, 
        fetchProducts, 
        fetchProductsByCategory } = useContext(ProductContext);

    const { id } = useParams();

    const activeCategory = categories.find(
    category => String(category.id) === String(id)
    );

    useEffect(() => {
        if(!activeCategory?.name) return;
        async function fetchData() {
            try {
                if(activeCategory?.name === "all") {
                    await fetchProducts();
                    return;
                }

                    await fetchProductsByCategory(id);
                
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [activeCategory?.name, id]);

    const handleQuickShopButton = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("QuickShopButton clicked!");
    };

    if(loadingProducts) return <div>Loading products...</div>
    if(errorsProducts) return <div>Failed to fetch products.</div>

    return (
        <div className="container mx-auto p-5 mt-20">
            <h1 className="capitalize text-3xl my-4">{activeCategory?.name}</h1>

            <div className="grid grid-cols-3 gap-2">
                {products?.map((product) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`}
                        state={{ 
                            categoryName: activeCategory?.name,
                            categoryId: activeCategory?.id
                        }}                   
                    >
                        <Card 
                            product={product} 
                            data-testid={`product-${toKebabCase(product.name)}`}
                            onQuickShop={handleQuickShopButton}
                        />
                    </Link>                    
                ))}
            </div>
        </div>
    );
}