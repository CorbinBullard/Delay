import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleItemThunk } from "../../store/item";
import { useParams } from "react-router";
import "./ItemDetails.css"

const ItemDetails = () => {
    const { itemId } = useParams();
    const item = useSelector(state => state.items.currentItem);
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleItemThunk(itemId))
    }, [dispatch, itemId])




    // Object.values(item.ProductReviews).forEach((item) => {
    //     console.log(item.stars)
    // })
    console.log("ITEM : ", item)

    if (!item) return null

    const avgStarRating = item.ProductReviews?.reduce((acc, curr) => {
        return acc += curr.stars
    }, 0) / item.ProductReviews?.length;

    console.log("STARS : ", avgStarRating)

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
        </div>
    )
}
export default ItemDetails
