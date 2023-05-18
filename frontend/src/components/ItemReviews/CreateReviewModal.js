import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { postNewReviewThunk, updateReviewThunk } from "../../store/item";
import { useModal } from "../../context/Modal";

const CreateReviewModal = ({ itemId, isUpdating, review }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [stars, setStars] = useState(isUpdating? review.stars : 5);
    const [_review, setReview] = useState(isUpdating? review.review : "");

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
            return alert("Cannot Submit");
        }

        if (!isUpdating) {
            dispatch(postNewReviewThunk(itemId, { stars, review: _review }))
            closeModal()
        } else {
            dispatch(updateReviewThunk(review.id, {stars, review: _review}))
            closeModal()
        }

    }

    return (
        <form
            onSubmit={handleSubmit}>
            <div className="review-feild">
                <label>Stars</label>
                <input
                    type="number"
                    value={stars}
                    onChange={e => setStars(e.target.value)}
                />

            </div>
            <div className="review-feild">
                <label>Review</label>
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
