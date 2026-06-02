import { useContext, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

import CategoryContext from "../store/contexts/CategoryContext.jsx";
import ProductContext from "../store/contexts/ProductContext.jsx";
import CartContext from "../store/contexts/CartContext.jsx";

import Card from "../components/UI/Card.jsx";
import { toKebabCase } from "../helper/string.js";

export default function ProductsPage() {
    const {
        categories,
        loading: loadingCategories,
        error: errorCategories,
    } = useContext(CategoryContext);

    const { 
        products, 
        loading: loadingProducts, 
        errors: errorsProducts, 
        fetchProducts, 
        fetchProductsByCategory 
    } = useContext(ProductContext);

    const {
        addItemToCart,
    } = useContext(CartContext);

    const { categoryName } = useParams();
    const location = useLocation();
    const normalizeCategoryName = categoryName?.trim().toLowerCase();

    const activeCategory = categories?.find(
    (category) => category.name.trim().toLowerCase() === normalizeCategoryName
    );

    useEffect(() => {
        if(!normalizeCategoryName) return;
        if(loadingCategories) return;

        async function fetchData() {
            try {
                if(normalizeCategoryName === 'all') {
                    await fetchProducts();
                    return;
                }
                
                if(!activeCategory) return;

                await fetchProductsByCategory(activeCategory.id);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [ 
        normalizeCategoryName,
        activeCategory,
        loadingCategories,
    ]);

    const handleQuickShopButton = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        const selectedAttributes = {};

        product.attributes?.forEach((attribute) => {
            if(attribute.items?.length > 0) {
                selectedAttributes[attribute.name] = attribute.items[0].value;
            }
        });

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
            selectedAttributes,
            quantity: 1,
        }
        addItemToCart(cartItem);
    };

    if(loadingCategories || loadingProducts ) return <div>Loading products...</div>
    if(errorCategories || errorsProducts) return <div>Failed to fetch products...</div>

    
    if(normalizeCategoryName !== 'all' && categories.length > 0 && !activeCategory) {
            return (
            <div className="text-center mt-30">
                <h2 className="text-2xl font-semibold">Category not found</h2>
                <p className="text-gray-500 mt-2">Try selecting another category.</p>
            </div>
        )
    };

    if(!products || products.length === 0) {
        return (
            <div className="text-center mt-30">
                <h2 className="text-2xl font-semibold">No products found for this category.</h2>
                <p className="text-gray-500 mt-2">Try selecting another category.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-5 mt-20">
            <h1 className="capitalize text-3xl my-4">{activeCategory?.name ?? normalizeCategoryName}</h1>

            <div className="grid grid-cols-3 gap-2">
                {products?.map((product) => (
                    <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        state={{ 
                            categoryName: activeCategory?.name,
                            categoryId: activeCategory?.id,
                            fromCategory: location.pathname
                        }}                   
                    >
                        <Card 
                            product={product} 
                            data-testid={`product-${toKebabCase(product.name)}`}
                            onQuickShop={(e) => handleQuickShopButton(e, product)}
                        />
                    </Link>                    
                ))}
            </div>
        </div>
    );
}