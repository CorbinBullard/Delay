import { csrfFetch } from "./csrf";
import { deepCopy } from "./deepCopy";

const LOAD_CART = 'cart/LoadCart';
const ADD_ITEM_TO_CART = 'cart/AddItem';
const REMOVE_ITEM_FROM_CART = 'cart/RemoveItem'


const loadCartAction = cart => {
    return {
        type: LOAD_CART,
        cart
    }
}

export const fetchCartItemsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/users/cart');
    if (res.ok) {
        const cart = await res.json();
        dispatch(loadCartAction(cart));
        return cart;
    } else {
        const errors = res.errors;
        return errors;
    }
}

// Add Item to cart

const addItemToCart = item => {
    return {
        type: ADD_ITEM_TO_CART,
        item
    }
}

export const postItemToCart = itemId => async dispatch => {
    const res = await csrfFetch(`/api/items/${itemId}/add-to-cart`, {
        method: 'POST'
    })
    if (res.ok) {
        const item = await res.json()
        dispatch(addItemToCart(item));
    } else {
        const errors = res.errors;
        return errors;
    }
}

// Remove Item From Cart

const removeFromCartAction = cartId => {
    return {
        type: REMOVE_ITEM_FROM_CART,
        cartId
    }
}
export const deleteCartItemThunk = cartId => async dispatch => {
    const res = await csrfFetch(`/api/cart/${cartId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(removeFromCartAction(cartId));
    }
}

const initialState = {}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_CART: {
            newState = deepCopy(state)
            action.cart.forEach(item => {
                newState[item.id] = item
            });
            return newState
        }
        case ADD_ITEM_TO_CART: {
            newState = deepCopy(state);
            newState[action.item.id] = action.item;
            return newState;
        }
        case REMOVE_ITEM_FROM_CART: {
            newState = deepCopy(state);
            delete newState[action.cartId];
            return newState;
        }
        default:
            return state;
    }
}

export default cartReducer;
