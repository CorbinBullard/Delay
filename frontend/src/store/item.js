import { csrfFetch } from "./csrf";
import { deepCopy } from "./deepCopy";
const LOAD_ITEMS = 'items/loadItems';

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




const initialState = { allItems: {}, currentItem: {} };

const itemReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_ITEMS:
            newState = deepCopy(state)
            action.items.forEach(item => {
                newState.allItems[item.id] = item
            });
            return newState;
        default:
            return state;
    }
};
export default itemReducer;
