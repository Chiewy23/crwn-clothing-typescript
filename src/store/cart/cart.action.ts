import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utilities/reducer/reducer.utils";



const addCartItem = (cartItems: CartItem[], itemToAdd: CategoryItem): CartItem[] => {
    const existingItem = cartItems.find(item => item.id === itemToAdd.id);

    if (existingItem) {
        return cartItems.map(item => {
            return item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item;
        });
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems: CartItem[], itemToRemove: CategoryItem): CartItem[] => {
    const existingItem = cartItems.find(item => item.id === itemToRemove.id);

    if (existingItem && existingItem.quantity === 1) {
        return cartItems.filter(item => item.id !== itemToRemove.id);
    }

    return cartItems.map(item => {
        return item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item;
    });
};

const clearCartItem = (cartItems: CartItem[], itemToClear: CategoryItem): CartItem[] => {
    return cartItems.filter(item => item.id !== itemToClear.id);
};



export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], itemToAdd: CartItem) => {
    const newCartItems = addCartItem(cartItems, itemToAdd);
    return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, itemToRemove);
    return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], itemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, itemToClear);
    return setCartItems(newCartItems);
};