import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    isOpen: false,
    addItemToCart: () => {},
    increaseItemFromCart: () => {},
    decreaseItemFromCart: () => {},
    toggleCart: () => {},
    openCart: () => {},
    closeCart: () => {},
});

const initialState = {
    items: [],
    isOpen: false,
};

function normalizeKeys(attrs) {
    return Object.keys(attrs).reduce((acc, key) => {
        acc[key.toLocaleLowerCase()] = attrs[key];
        return acc;
    }, {});
}

function isSameConfig(itemA, itemB) {
    if(itemA.productId !== itemB.productId) return false;

    const attrsA = normalizeKeys(itemA.selectedAttributes);
    const attrsB = normalizeKeys(itemB.selectedAttributes);

    const keysA = Object.keys(attrsA);
    const keysB = Object.keys(attrsB);

    if(keysA.length !== keysB.length) return false;

    return keysA.every(key => attrsA[key] === attrsB[key]);
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
            const index = action.payload;

            if(index < 0 || index >= state.items.length) return state;

            const updatedItems = [...state.items];

            updatedItems[index] = {
                ...updatedItems[index],
                quantity: updatedItems[index].quantity + 1,
            };

            return {
                ...state,
                items: updatedItems,
            };
        };
        case "DECREASE_ITEM":
            {
                const index = action.payload;

                if(index < 0 || index >= state.items.length) return state;

                const updatedItems = [...state.items];
                const existingCartItem = updatedItems[index];

                if(existingCartItem.quantity === 1) {
                    updatedItems.splice(index, 1);
                }  else {
                    updatedItems[index] = {
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

    const increaseItemFromCart = (index) => {
        dispatchCartAction({
            type: "INCREASE_ITEM",
            payload: index,
        });
    }

    const decreaseItemFromCart = (index) => {
        dispatchCartAction({
            type: "DECREASE_ITEM",
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
        increaseItemFromCart,
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