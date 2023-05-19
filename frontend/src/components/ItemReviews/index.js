import { useSelector } from "react-redux";
import "./ItemReviews.css"
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";

const ItemReviews = ({ item, reviews }) => {

    const user = useSelector(state => state.session.user)
    const reviewUserIds = reviews?.map(review => review.User.id);


    const orderedReveiws = reviews?.sort(sortFn);

    function sortFn(a, b) {
        const aDate = new Date(a.createdAt).getTime()
        const bDate = new Date(b.createdAt).getTime()

        if (aDate > bDate) return -1;
        else return 1

    }


    if (!reviews) return null


    return (
        <div id="review-page-container">
            <h1>Product Reviews</h1>
            <div id="add-review-button-container">
                {user && !reviewUserIds.includes(user.id) && item.ownerId !== user.id &&
                    <OpenModalButton
                        buttonText={"Add Review"}
                        modalComponent={<CreateReviewModal itemId={item.id} isUpdating={false} />}
                    />}
            </div>
            <div id="all-reviews-container">

                {orderedReveiws?.map(review => (
                    <div key={review.id} className="review-container">
                        <p>{review.User.firstName} {review.User.lastName}</p>
                        <p>{
                            <>
                                <i className={`${review.stars >= 1 ? "fas fa-star" : "far fa-star"}`} />
                                <i className={`${review.stars >= 2 ? "fas fa-star" : "far fa-star"}`} />
                                <i className={`${review.stars >= 3 ? "fas fa-star" : "far fa-star"}`} />
                                <i className={`${review.stars >= 4 ? "fas fa-star" : "far fa-star"}`} />
                                <i className={`${review.stars >= 5 ? "fas fa-star" : "far fa-star"}`} />
                            </>
                        }

                        </p>
                        {user && user.id === review.userId &&
                            <div id="review-update-delete-buttons">
                                <OpenModalButton
                                    buttonText={"Update"}
                                    modalComponent={<CreateReviewModal itemId={review.itemId} isUpdating={true} review={review} />}
                                />
                                <OpenModalButton
                                    buttonText={"Delete"}
                                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                />
                            </div>
                        }
                        <p>{review.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default ItemReviews;
