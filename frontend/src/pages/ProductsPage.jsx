import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryContext from "../store/contexts/CategoryContext.jsx";
import ProductContext from "../store/contexts/ProductContext.jsx";
import CartContext from "../store/contexts/CartContext.jsx";

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
        fetchProductsByCategory 
    } = useContext(ProductContext);

    const {
        addItemToCart,
    } = useContext(CartContext);

    const { categoryName } = useParams();

    const activeCategory = categories?.find(
    (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    );

    useEffect(() => {
        if(!categoryName || !activeCategory) return;

        async function fetchData() {
            try {
                if(activeCategory.name.toLowerCase() === 'all') {
                    await fetchProducts();
                    return;
                }

                    await fetchProductsByCategory(activeCategory.id);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();

    }, [ categoryName, activeCategory ]);

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

    if(!categoryName) return (
        <div className="text-center mt-30">
            <h2 className="text-2xl font-semibold">Category not found</h2>
            <p className="text-gray-500 mt-2">Try selecting another category.</p>
        </div>
    );
    if(loadingProducts) return <div>Loading products...</div>
    if(errorsProducts) return <div>Failed to fetch products...</div>

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
            <h1 className="capitalize text-3xl my-4">{activeCategory?.name ?? "Category"}</h1>

            <div className="grid grid-cols-3 gap-2">
                {products?.map((product) => (
                    <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        state={{ 
                            categoryName: activeCategory?.name,
                            categoryId: activeCategory?.id
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