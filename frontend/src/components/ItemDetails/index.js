import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, fetchSingleItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";
import "./ItemDetails.css"
import ItemReviews from "../ItemReviews";
import OpenModalButton from "../OpenModalButton";
import DeleteItemModal from "./DeleteItemModal";

const ItemDetails = () => {
    const { itemId } = useParams();
    const history = useHistory();
    const item = useSelector(state => state.items.currentItem);
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleItemThunk(itemId))
    }, [dispatch, itemId])

    if (!item) return null

    const avgStarRating = item.ProductReviews?.length ? (item.ProductReviews?.reduce((acc, curr) => {
        return acc += curr.stars
    }, 0) / item.ProductReviews?.length).toFixed(2) : "No Reviews"



    return (
        <div id="item-details-page-container-wrapper">
            <div id="item-details-page-container">
                <div id="item-details-container">
                    <img id="item-details-image" src={item.previewImage} />
                    <div id="item-details-info-container">
                        <h3>{item.User?.firstName} {item.User?.lastName}</h3>
                        <h2>{item.name}</h2>
                        <p><i className="star fas fa-star"></i> {avgStarRating} - ({item.ProductReviews?.length})</p>
                        <p>{item.condition}</p>
                        <p>${item.price}</p>
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
