import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { postNewReviewThunk, updateReviewThunk } from "../../store/item";
import { useModal } from "../../context/Modal";

const CreateReviewModal = ({ itemId, isUpdating, review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [stars, setStars] = useState(isUpdating ? review.stars : 1);
    const [activeRating, setActiveRating] = useState(isUpdating ? review.stars : 1)
    const [_review, setReview] = useState(isUpdating ? review.review : "");

    const [errors, setErrors] = useState({});
    const [submittedWithErrors, setSubmittedWithErrors] = useState(false);

    useEffect(() => {
        const errorsObj = {}
        if (stars > 5) setStars(5)
        if (stars < 1) setStars(1)
        if (_review.length < 10) errorsObj.review = "Review must be a minimum of 10 characters";
        if (_review.length > 2000) errorsObj.review = "Review can only be up to 2000 characters long";
        setErrors(errorsObj)

    }, [stars, _review])


    const handleSubmit = e => {
        e.preventDefault();
        if (Object.values(errors).length) {
            setSubmittedWithErrors(true)
            return 
        }

        if (!isUpdating) {
            dispatch(postNewReviewThunk(itemId, { stars, review: _review }))
            closeModal()
        } else {
            dispatch(updateReviewThunk(review.id, { stars, review: _review }))
            closeModal()
        }

    }

    return (
        <form
            id="create-review-form"
            onSubmit={handleSubmit}>
            <label className="create-review-label">Your Rating</label>
            <div id="review-feild-stars">
                <div id="star-input-container">
                    <div
                        // `${review.stars >= 1 ? "fas fa-star" : "far fa-star"}`
                        className={activeRating >= 1 ? "fas fa-star" : "far fa-star"}
                        onMouseEnter={() => setActiveRating(1)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(1)}
                    >
                    </div>
                    <div
                        className={activeRating >= 2 ? "fas fa-star" : "far fa-star"}
                        onMouseEnter={() => setActiveRating(2)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(2)}
                    >
                    </div>
                    <div
                        className={activeRating >= 3 ? "fas fa-star" : "far fa-star"}
                        onMouseEnter={() => setActiveRating(3)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(3)}
                    >
                    </div>
                    <div
                        className={activeRating >= 4 ? "fas fa-star" : "far fa-star"}
                        onMouseEnter={() => setActiveRating(4)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(4)}
                    >
                    </div>
                    <div
                        className={activeRating >= 5 ? "fas fa-star" : "far fa-star"}
                        onMouseEnter={() => setActiveRating(5)}
                        onMouseLeave={() => setActiveRating(stars)}
                        onClick={() => setStars(5)}
                    >
                    </div>
                </div>
            </div>
            <div id="review-field-review">
                <label className="create-review-label">Review</label>
                <textarea
                    type="text"
                    value={_review}
                    onChange={e => setReview(e.target.value)}
                />
                {submittedWithErrors && errors.review &&
                    <p className="errors">{errors.review}</p>}
            </div>
            <button>Submit</button>
        </form>
    )
}
export default CreateReviewModal;
