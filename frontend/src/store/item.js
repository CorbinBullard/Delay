import { useFilters } from "../context/Filters";
import { csrfFetch } from "./csrf";
import { deepCopy } from "./deepCopy";
const LOAD_ITEMS = "items/loadItems";
const LOAD_SINGLE_ITEM = "items/loadSingleItem";
const CREATE_ITEM = "items/CreateNewItem";
const REMOVE_ITEM = "items/RemoveItem";
const CREATE_REVIEW = "reviews/CreateNewReview";
const UPDATE_REVIEW = "reviews/UpdateReview";
const DELETE_REVIEW = "reviews/DeleteReview";
const CREATE_ITEM_IMAGE = "images/CreateItemImage";
const DELETE_ITEM_IMAGE = "images/DeleteItemImage";

// Load ALL ITEMS
const loadItemsAction = (items) => {
  return {
    type: LOAD_ITEMS,
    items,
  };
};

export const fetchAllItemsThunk = (filters) => async (dispatch) => {
  let resStr = "";
  if (filters) {
    const { name, minPrice, maxPrice, brand, condition, instrumentType, year } =
      filters;
    if (name) resStr += `name=${name}&`;
    if (minPrice) resStr += `minPrice=${minPrice}&`;
    if (maxPrice) resStr += `maxPrice=${maxPrice}&`;
    if (brand) resStr += `brand=${brand}&`;
    if (condition) resStr += `condition=${condition}&`;
    if (year) resStr += `year=${year}`;
    if (instrumentType) resStr += `instrumentType=${instrumentType}`;
  }

  const res = await csrfFetch(`/api/items?${resStr}`);

  if (res.ok) {
    const items = await res.json();
    const result = await dispatch(loadItemsAction(items));
    return result;
  } else {
    const errors = res.errors;
    return errors;
  }
};

// LOAD SINGLE ITEM
const loadSingleItemAction = (item) => {
  return {
    type: LOAD_SINGLE_ITEM,
    item,
  };
};
export const fetchSingleItemThunk = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}`);

  if (res.ok) {
    const item = await res.json();
    dispatch(loadSingleItemAction(item));
    return item;
  } else {
    const errors = res.errors;
    return errors;
  }
};

// CREATE NEW ITEM
const createNewItemAction = (item) => {
  return {
    type: CREATE_ITEM,
    item,
  };
};
export const postNewItemThunk = (item) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("brand", item.brand);
  formData.append("description", item.description);
  formData.append("instrumentType", item.instrumentType);
  formData.append("year", item.year);
  formData.append("condition", item.condition);
  formData.append("price", item.price);
  formData.append("image", item.previewImage);

  const res = await csrfFetch("/api/items", {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const item = await res.json();
    dispatch(createNewItemAction(item));
    return item;
  } else {
    const errors = res.errors;
    return errors;
  }
};

// UPDATE NEW ITEM
export const updateNewItemThunk = (itemId, _item) => async (dispatch) => {
  const formData = new FormData();
  formData.append("name", _item.name);
  formData.append("brand", _item.brand);
  formData.append("description", _item.description);
  formData.append("instrumentType", _item.instrumentType);
  formData.append("year", _item.year);
  formData.append("condition", _item.condition);
  formData.append("price", _item.price);
  formData.append("image", _item.previewImage);

  const res = await csrfFetch(`/api/items/${itemId}`, {
    method: "PUT",
    body: formData,
  });
  if (res.ok) {
    const item = await res.json();
    dispatch(createNewItemAction(item));
    return item;
  } else {
    const errors = res.errors;
    return errors;
  }
};

// DELETE ITEM
const removeItemAction = (itemId) => {
  return {
    type: REMOVE_ITEM,
    itemId,
  };
};
export const deleteItemThunk = (itemId) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeItemAction(itemId));
  } else {
    const errors = res.errors;
    return errors;
  }
};
// Create New Review for current Item

const createNewReviewAction = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

export const postNewReviewThunk = (itemId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${itemId}/reviews`, {
    method: "POST",
    body: JSON.stringify({ ...review }),
  });
  if (res.ok) {
    const review = await res.json();
    dispatch(createNewReviewAction(review));
  } else {
    const errors = res.errors;
    return errors;
  }
};
// Update Review for current Item

const updateReviewAction = (review) => {
  return {
    type: UPDATE_REVIEW,
    review,
  };
};

export const updateReviewThunk = (reviewId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify({ ...review }),
  });
  if (res.ok) {
    const review = await res.json();
    dispatch(updateReviewAction(review));
  } else {
    const errors = res.errors;
    return errors;
  }
};

// Delete Review

const removeReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    reviewId,
  };
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeReviewAction(reviewId));
  } else {
    const errors = res.errors;
    return errors;
  }
};

// get Current User's items

export const fetchCurrentUserItemsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/users/my-listings`);

  if (res.ok) {
    const items = await res.json();
    dispatch(loadItemsAction(items));
  } else {
    const errors = res.errors;
    return errors;
  }
};

// Create New Image for Item

const createNewImageAction = (image) => {
  return {
    type: CREATE_ITEM_IMAGE,
    image,
  };
};

export const postNewImageThunk = (itemId, image) => async (dispatch) => {
  const formData = new FormData();

  formData.append("image", image);

  const res = await csrfFetch(`/api/items/${itemId}/images`, {
    method: "POST",
    body: formData,
  });
  if (res.ok) {
    const image = await res.json();
    dispatch(createNewImageAction(image));
    return image;
  } else {
    const errors = res.errors;
    return errors;
  }
};

// Delete Item Image
const removeImageAction = (imageId) => {
  return {
    type: DELETE_ITEM_IMAGE,
    imageId,
  };
};
export const deleteImageThunk = (imageId) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(removeImageAction(imageId));
    return { message: "Success" };
  } else {
    const errors = res.errors;
    return errors;
  }
};

const initialState = { allItems: {}, currentItem: {} };

const itemReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_ITEMS:
      newState = deepCopy(state);
      newState.allItems = {};
      newState.currentItem = {};
      action.items.forEach((item) => {
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
      return newState;
    case REMOVE_ITEM:
      newState = deepCopy(state);
      delete newState.allItems[action.itemId];
      newState.currentItem = {};
      return newState;
    case CREATE_REVIEW:
      newState = deepCopy(state);
      newState.currentItem.ProductReviews.push(action.review);
      return newState;
    case UPDATE_REVIEW:
      newState = deepCopy(state);
      newState.currentItem.ProductReviews =
        state.currentItem.ProductReviews.map((review) => {
        //   console.log("REVIEW ID, ACTION ID : ", review.id, action.review.id);
          if (review.id === action.review.id) {
            // console.log("TRUE");
            return action.review;
          } else {
            // console.log("FALSE");
            return review;
          }
        });
      return newState;
    case DELETE_REVIEW:
      newState = deepCopy(state);
      newState.currentItem.ProductReviews =
        state.currentItem.ProductReviews.filter(
          (review) => review.id !== action.reviewId
        );
      return newState;
    case CREATE_ITEM_IMAGE:
      newState = deepCopy(state);
      newState.currentItem.ItemImages.push(action.image);
      return newState;
    case DELETE_ITEM_IMAGE:
      newState = deepCopy(state);
      newState.currentItem.ItemImages = state.currentItem.ItemImages.filter(
        (image) => image.id !== action.imageId
      );
      return newState;
    default:
      return state;
  }
};
export default itemReducer;
