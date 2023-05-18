import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteItemThunk, fetchSingleItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";
import "./ItemDetails.css"
import ItemReviews from "../ItemReviews";

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

    const avgStarRating = (item.ProductReviews?.reduce((acc, curr) => {
        return acc += curr.stars
    }, 0) / item.ProductReviews?.length).toFixed(2)

    // This may get moved
    const handleDelete = () => {
        dispatch(deleteItemThunk(item.id))
        history.push('/');
    }


    return (
        <div id="item-details-container">
            <img id="item-details-image" src={item.previewImage} />
            <div id="item-details-info-container">
                <p>{item.User?.firstName} {item.User?.lastName}</p>
                <p>{avgStarRating} - stars</p>
                <p>{item.condition}</p>
                <p>{item.price}</p>
                <p>{item.description}</p>
            </div>

            {/* // MOVE THIS LATER */}
            {user && user.id === item.ownerId &&
                <>
                    <button
                        onClick={() => history.push(`/items/${item.id}/edit`)}
                    >UPDATE</button>
                    <button
                        onClick={handleDelete}
                    >DELETE</button>
                </>
            }
            <div id="item-reviews-container">
                <ItemReviews reviews={item.ProductReviews} item={item} />

            </div>
        </div>
    )
}
export default ItemDetails
