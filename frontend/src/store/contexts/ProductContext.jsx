import { createContext, useReducer } from "react";
import * as api from "../../api/graphqlClient.js";

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

const ProductContext = createContext({
    products: [],
    loading: false,
    errors: null,
    fetchProducts: () => {},
    fetchProductsByCategory: () => {},
});

const initialState = {
    products: [],
    loading: false,
    errors: null,
};

function productReducer(state, action) {
    switch(action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case "SET_ERROR":
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case "SET_PRODUCTS":
            return {
                ...state,
                products: action.payload,
                loading: false,
                errors: null,
            };
        default: 
            return state;
    }
};

export function ProductContextProvider({children}) {
    const [ productState, dispatchProductAction ] = useReducer(productReducer, initialState);
    
    const fetchProducts= async() => {
        dispatchProductAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.graphqlRequest(PRODUCTS);

            dispatchProductAction({
                type: "SET_PRODUCTS",
                payload: res.products,
            });

            console.log(res);

            return { success: true };
        } catch (e) {
            const msg = 
            e.response?.data?.message ||
            "Failed to fetch products.";

            dispatchProductAction({
                type: "SET_ERROR",
                payload: msg,
            });

            return { success: false };
        }
    }

    const fetchProductsByCategory = async(categoryId) => {
        dispatchProductAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.graphqlRequest(
                PRODUCTS_BY_CATEGORY_QUERY,
                { categoryId }
            );

            dispatchProductAction({
                type: "SET_PRODUCTS",
                payload: res.products,
            });

            console.log(res);

            return { success: true};
        } catch (error) {
            const msg = 
            error.response?.data?.message || 
            
            dispatchProductAction({
                type: "SET_ERROR",
                payload: msg,
            });

            return {success: false};
        }
    }
    
    const productContext = {
        ...productState,
        fetchProducts,
        fetchProductsByCategory,
    };

    return (
        <ProductContext.Provider value={productContext}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
