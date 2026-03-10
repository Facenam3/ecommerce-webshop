import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CategoryContext from "../store/contexts/CategoryContext.jsx";
import * as api from "../api/graphqlClient.js";

const PRODUCTS = `
    query GetProducts {
        products {
            id
            name
            brand
            inStock
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
        }
    }
`;

const PRODUCTS_BY_CATEGORY_QUERY = `
    query GetProductsByCategory($categoryId: ID!) {
        products(categoryId: $categoryId) {
            id
            name
            brand
            inStock
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
        }
    }
`;

export default function CategoryPage() {
    const {categories, loading, errors} = useContext(CategoryContext);
    const [products, setProducts] = useState([]);
    const { id } = useParams();

    const activeCategory = categories.find(
    category => String(category.id) === String(id)
    );

    useEffect( () => {

        async function fetchData() {
            try {
                if(activeCategory?.name === "all") {
                    const res = await api.graphqlRequest(PRODUCTS);
                    setProducts(res.products);
                    return;
                }

                if(activeCategory?.name) {
                    const res = await api.graphqlRequest(
                        PRODUCTS_BY_CATEGORY_QUERY,
                        {categoryId: id}
                    );

                    setProducts(res.products);
                }
                
            } catch (error) {
                console.log(error);
            }
        }        

        fetchData();

    }, [activeCategory?.name]);

    console.log("id:", id);
    console.log("activeCategory:", activeCategory);
    console.log("activeCategory.name:", activeCategory?.name);

    
    if(loading) return <div>Loading...</div>
    if(errors) return <div>Failed to fetch categories</div>

    return (
        <div className="container mx-auto p-4">
            <h1 className="capitalize text-3xl mt-5">{activeCategory?.name}</h1>

            {products?.map((product) => (
                <div key={product.id}> {product.name} </div>
            ))}
        </div>
    );
}