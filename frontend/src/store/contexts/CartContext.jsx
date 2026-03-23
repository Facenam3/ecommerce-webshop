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
        case "ADD_ITEM":
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
                items: [...state.items, newItem],
                isOpen: true,
            };
        };
        case "INCREASE_ITEM": {
            const target = action.payload;

            const existingCartItemIndex = state.items.findIndex(
                (item) => isSameConfig(item, target)
            );

            if(existingCartItemIndex === -1) return state;

            const updatedItems = [...state.items];
            const existingItem = updatedItems[existingCartItemIndex];

            updatedItems[existingCartItemIndex] = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };

            return {
                ...state,
                items: updatedItems,
            };
        };
        case "DECREASE_ITEM":
            {
                const target = action.payload;

                const existingCartItemIndex = state.items.findIndex(
                    (item) => isSameConfig(item, target)
                );

                if(!existingCartItemIndex === -1) return state;

                const existingCartItem = state.items[existingCartItemIndex];

                const updatedItems = [...state.items];

                if(existingCartItem.quantity === 1) {
                    updatedItems.splice(existingCartItemIndex, 1);
                }  else {
                    updatedItems[existingCartItemIndex] = {
                        ...existingCartItem,
                        quantity: existingCartItem.quantity - 1,
                    };
                }

                return {
                    ...state,
                    items: updatedItems,
                };
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

    const decreaseItemFromCart = (index) => {
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
        decreaseItemFromCart,
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