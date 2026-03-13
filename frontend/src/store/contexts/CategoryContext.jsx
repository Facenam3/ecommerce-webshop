import { createContext, useReducer } from "react";
import * as api from "../../api/graphqlClient.js";

const CATEGORIES_QUERY = `
  query {
    categories {
      id
      name
    }
  }
`;

const CategoryContext = createContext({
    categories: [],
    loading: false,
    errors: null,
    fetchCategories: () => {},
});

const initialState = {
    categories: [],
    loading: false,
    errors: null,
};

function categoryReducer(state, action) {
    switch(action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: true,
                errors: null,
            };
        case "SET_ERROR" :
            return{
                ...state,
                loading: false,
                errors: action.payload,
            };
        case "SET_CATEGORIES":
            return {
                ...state,
                categories: action.payload,
                loading: false,
                errors: null,
            };
        default: 
            return state;
    }
};

export function CategoryContextProvider({children}){
    const [categoryState, dispatchCategoryAction] = useReducer(categoryReducer, initialState);

    const fetchCategories = async() => {
        dispatchCategoryAction({type: "SET_LOADING"});

        try {
            const res = await api.graphqlRequest(CATEGORIES_QUERY);

            dispatchCategoryAction({
                type: "SET_CATEGORIES",
                payload: res.categories,
            });

            return {success: true};
        } catch (e) {
            const message = 
            e.response?.data?.message || 
            "Falied to fetch categories.";

            dispatchCategoryAction({
                type: "SET_ERROR",
                payload: message,                
            });

            return {success: false};
        }
    }

    const categoryContext = {
        ...categoryState,
        fetchCategories,
    };

    return (
        <CategoryContext.Provider value={categoryContext}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContext;