import { csrfFetch } from "./csrf";
import { deepCopy } from "./deepCopy";
const LOAD_ITEMS = 'items/loadItems';
const LOAD_SINGLE_ITEM = 'items/loadSingleItem';
const CREATE_ITEM = 'items/CreateNewItem'

// Load ALL ITEMS
const loadItemsAction = (items) => {
    return {
        type: LOAD_ITEMS,
        items
    }
}


export const fetchAllItemsThunk = () => async dispatch => {
    const res = await csrfFetch('/api/items');

    if (res.ok) {
        const items = await res.json();
        dispatch(loadItemsAction(items))
    } else {
        const errors = res.errors;
        return errors;
    }
}

// LOAD SINGLE ITEM
const loadSingleItemAction = item => {
    return {
        type: LOAD_SINGLE_ITEM,
        item
    }
}
export const fetchSingleItemThunk = (itemId) => async dispatch => {
    const res = await csrfFetch(`/api/items/${itemId}`);

    if (res.ok) {
        const item = await res.json();
        dispatch(loadSingleItemAction(item))
    } else {
        const errors = res.errors;
        return errors;
    }
}

// CREATE NEW ITEM
const createNewItemAction = item => {
    return {
        type: CREATE_ITEM,
        item
    }
}
export const postNewItemThunk = item => async dispatch => {
    const res = await csrfFetch('/api/items', {
        method: 'POST',
        body: JSON.stringify({ ...item })
    })
    if (res.ok) {
        const item = await res.json();
        dispatch(createNewItemAction(item));
        return item;
    } else {
        const errors = res.errors;
        return errors;
    }
}

const initialState = { allItems: {}, currentItem: {} };

const itemReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ITEMS:
            newState = deepCopy(state)
            action.items.forEach(item => {
                newState.allItems[item.id] = item;
            });
            return newState;
        case LOAD_SINGLE_ITEM:
            newState = deepCopy(state);
            newState.currentItem = action.item;
            return newState;
        case CREATE_ITEM:
            newState = deepCopy(state);
            newState.allItems[action.item.id] = action.item;
            newState.currentItem = action.item;
        default:
            return state;
    }
};
export default itemReducer;
