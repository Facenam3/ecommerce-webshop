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

const PRODUCT_BY_ID = `
    query GetProductById($id: String!) {
        product(id: $id) {
            id
            name
            brand
            inStock
            description
            gallery
            prices {
                amount
                currency {
                    label
                    symbol
                }
            }
            attributes {
                id
                name
                type
                items {
                    id
                    displayValue
                    value
                }
            }
        }
    }
`;

const ProductContext = createContext({
    products: [],
    product: null,
    loading: false,
    errors: null,
    fetchProducts: () => {},
    fetchProductsByCategory: () => {},
    fetchProductById: () => {},
});

const initialState = {
    products: [],
    product: null,
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
        case "SET_PRODUCT":
            return {
                ...state,
                product: action.payload,
                loading: false,
                errors: null,
            };
        case "CLEAR_PRODUCT":
            return {
                ...state,
                product: null,
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

            return { success: true};
        } catch (error) {
            const msg = 
            error.response?.data?.message || 
            "Failed to fetch products";
            
            dispatchProductAction({
                type: "SET_ERROR",
                payload: msg,
            });

            return {success: false};
        }
    }

    const fetchProductById = async(id) => {
        dispatchProductAction({
            type: "SET_LOADING",
        });

        try {
            const res = await api.graphqlRequest( PRODUCT_BY_ID , {id});

            dispatchProductAction({
                type: "SET_PRODUCT",
                payload: res.product,
            });

            return { success: true };
        } catch (error) {
            const msg = 
            error.response?.data?.message  || 
            "Failed to fetch product";
            
            dispatchProductAction({
                type: "SET_ERROR",
                payload: msg,
            });

            return { success: false };
        }
    }
    
    const productContext = {
        ...productState,
        fetchProducts,
        fetchProductsByCategory,
        fetchProductById,
    };

    return (
        <ProductContext.Provider value={productContext}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContext;
