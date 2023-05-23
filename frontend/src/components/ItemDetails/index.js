import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, fetchSingleItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";
import "./ItemDetails.css"
import ItemReviews from "../ItemReviews";
import OpenModalButton from "../OpenModalButton";
import DeleteItemModal from "./DeleteItemModal";
import { deleteCartItemThunk, fetchCartItemsThunk, postItemToCart } from "../../store/cart";

const ItemDetails = () => {
    const { itemId } = useParams();
    const history = useHistory();
    const item = useSelector(state => state.items.currentItem);
    const user = useSelector(state => state.session.user);
    const cart = useSelector(state => state.cart)

    const [imageIndex, setImageIndex] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleItemThunk(itemId))
        if (user) dispatch(fetchCartItemsThunk())
    }, [dispatch, itemId])

    if (!item) return null

    const avgStarRating = item.ProductReviews?.length ? (item.ProductReviews?.reduce((acc, curr) => {
        return acc += curr.stars
    }, 0) / item.ProductReviews?.length).toFixed(2) : "No Reviews"

    const itemImages = [item?.previewImage].concat(item?.ItemImages?.map(image => image.url))


    const changeImage = action => {
        let currIndex = imageIndex;
        currIndex += action;
        if (currIndex > itemImages.length - 1) setImageIndex(0);
        else if (currIndex < 0) setImageIndex(itemImages.length - 1);
        else setImageIndex(currIndex);
    }

    // CART
    const addToCart = async () => {
        dispatch(postItemToCart(item.id))
    }
    const removeFromCart = async (cartItemId) => {
        dispatch(deleteCartItemThunk(cartItemId));
    }

    return (
        <div id="item-details-page-container-wrapper">
            <div id="item-details-page-container">
                <div id="item-details-container">
                    <div id="item-details-image-container">
                        <img id="item-details-image" src={itemImages[imageIndex]} />

                        {itemImages.length > 1 &&
                            <div id="item-image-change-buttons-container">
                                <button
                                    className="item-image-change-button"
                                    id="item-image-button-previous"
                                    onClick={() => changeImage(-1)}>
                                    <i class="fas fa-chevron-right fa-rotate-180"></i>
                                </button>
                                {itemImages.map((item, index) => (
                                    <i
                                        className={imageIndex === index ? "fas fa-circle" : "far fa-circle"}
                                        onClick={() => setImageIndex(index)}
                                    ></i>
                                    // <i class="far fa-circle"></i>
                                ))}
                                <button
                                    className="item-image-change-button"
                                    id="item-image-button-next"
                                    onClick={() => changeImage(1)}>
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        }
                    </div>
                    <div id="item-details-info-container">
                        <h3>{item.User?.firstName} {item.User?.lastName}</h3>
                        <h2>{item.name}</h2>
                        <p><i className="star fas fa-star"></i> {avgStarRating} - ({item.ProductReviews?.length})</p>
                        <p>{item.condition}</p>
                        <h3>${item.price}</h3>
                        <p>{item.description}</p>
                        {user && user.id === item.ownerId &&
                            <div id="item-details-owner-btns">
                                <button
                                    className="item-details-owner-btn"
                                    onClick={() => history.push(`/items/${item.id}/edit`)}
                                >UPDATE</button>
                                <OpenModalButton
                                    className="item-details-owner-btn"
                                    buttonText={"DELETE"}
                                    modalComponent={<DeleteItemModal itemId={item.id} />}
                                />
                            </div>
                        }
                        {user && user.id !== item.ownerId &&
                            (!Object.values(cart).map(item => item.itemId).includes(item.id) ?
                                <button
                                    className="add-to-cart"
                                    onClick={addToCart}>Add to cart</button>
                                :
                                <button
                                    className="add-to-cart"
                                    onClick={() => removeFromCart(Object.values(cart).find(cart => cart.itemId === item.id).id)}
                                >Remove from cart</button>
                            )
                        }
                    </div>

                </div>
                <div id="item-reviews-container">
                    <ItemReviews reviews={item.ProductReviews} item={item} stars={avgStarRating} />
                </div>
            </div>
        </div>
    )
}
export default ItemDetails
