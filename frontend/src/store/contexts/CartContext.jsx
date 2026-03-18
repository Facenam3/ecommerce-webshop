import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    isOpen: false,
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    toggleCart: () => {},
    openCart: () => {},
    closeCart: () => {},
});

const initialState = {
    items: [],
    isOpen: false,
};

function isSameConfig(itemA, itemB) {
    return (
        itemA.productId === itemB.productId &&
        JSON.stringify(itemA.selectedAttributes) ===
        JSON.stringify(itemB.selectedAttributes)
    );
}

function cartReducer(state, action) {
    switch (action.type) {
        case "SET_ITEMS":
        {
            const newItem = action.payload;

            const exisitngItemIndex = state.items.findIndex((item) => 
                isSameConfig(item, newItem)
            );
            
            if(exisitngItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[exisitngItemIndex] = {
                    ...updatedItems[exisitngItemIndex],
                    quantity: updatedItems[exisitngItemIndex].quantity + 1,
                };
                return {
                    ...state,
                    items: updatedItems,
                    isOpen: true,
                };
            }

            return {
                ...state,
                items: {...state.items, newItem},
                isOpen: true,
            };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (_, index) => index !== action.payload
                ),
            };
        case "TOGGLE_CART":
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        case "OPEN_CART":
            return {
                ...state,
                isOpen: true,
            };
        case "CLOSE_CART":
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
};

export function CartContextProvider({children}) {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);
    

    const addItemToCart = (item) => {
        dispatchCartAction({
            type: "ADD_ITEM",
            payload: item,
        });
    };

    const removeItemFromCart = (index) => {
        dispatchCartAction({
            type: "REMOVE_ITEM",
            payload: index,
        });
    };

    const toggleCart = () => {
        dispatchCartAction({
            type: "TOGGLE_CART",
        });
    };

    const openCart = () => {
        dispatchCartAction({
            type: "OPEN_CART",
        });
    };

    const closeCart = () => {
        dispatchCartAction({
            type: "CLOSE_CART",
        });
    };

    const cartContext = {
        ...cartState,
        addItemToCart,
        removeItemFromCart,
        toggleCart,
        openCart,
        closeCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;