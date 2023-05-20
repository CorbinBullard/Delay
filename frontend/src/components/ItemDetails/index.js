import { useEffect, useState } from "react";
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
    const user = useSelector(state => state.session.user);

    const [imageIndex, setImageIndex] = useState(0)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleItemThunk(itemId))
    }, [dispatch, itemId])

    if (!item) return null

    const avgStarRating = item.ProductReviews?.length ? (item.ProductReviews?.reduce((acc, curr) => {
        return acc += curr.stars
    }, 0) / item.ProductReviews?.length).toFixed(2) : "No Reviews"

    const itemImages = [item?.previewImage].concat(item?.ItemImages?.map(image => image.url))
    console.log(itemImages);


    const changeImage = action => {
        let currIndex = imageIndex;
        currIndex += action;
        if (currIndex > itemImages.length - 1) setImageIndex(0);
        else if (currIndex < 0) setImageIndex(itemImages.length - 1);
        else setImageIndex(currIndex);
    }

    console.log(imageIndex);
    return (
        <div id="item-details-page-container-wrapper">
            <div id="item-details-page-container">
                <div id="item-details-container">
                    <div id="item-details-image-container">
                        {itemImages.length > 1 &&
                            <>
                                <button
                                    onClick={() => changeImage(-1)}>
                                    PREV
                                </button>
                                <button
                                    onClick={() => changeImage(1)}>
                                    NEXT
                                </button>
                            </>
                        }
                        <img id="item-details-image" src={itemImages[imageIndex]} />
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
