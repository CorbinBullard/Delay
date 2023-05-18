import { useSelector } from "react-redux";
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
        <>
            {user && !reviewUserIds.includes(user.id) && item.ownerId !== user.id &&
                <OpenModalButton
                    buttonText={"Add Review"}
                    modalComponent={<CreateReviewModal itemId={item.id} isUpdating={false} />}
                />}
            <h1>Product Reviews</h1>
            {orderedReveiws?.map(review => (
                <div key={review.id} className="review-container">
                    <p>{review.User.firstName} {review.User.lastName}</p>
                    <p>{review.stars}</p>
                    <p>{review.review}</p>
                    {user && user.id === review.userId &&
                        <>
                            <OpenModalButton
                                buttonText={"Update"}
                                modalComponent={<CreateReviewModal itemId={review.itemId} isUpdating={true} review={review} />}
                            />
                            <OpenModalButton
                                buttonText={"Delete"}
                                modalComponent={<DeleteReviewModal reviewId={review.id} />}
                            />
                        </>
                    }
                </div>
            ))}
        </>
    )

}
export default ItemReviews;
