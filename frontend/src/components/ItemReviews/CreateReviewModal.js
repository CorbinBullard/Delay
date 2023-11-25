import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewReviewThunk, updateReviewThunk } from "../../store/item";
import { useModal } from "../../context/Modal";
import SubmitButton from "../FormComponents/SubmitButton";
import Title from "../FormComponents/Title";
import OpenModalButton from "../OpenModalButton";
import ConfirmModal from "../FormComponents/ConfirmModal";

const CreateReviewModal = ({ itemId, isUpdating, review, handleDelete }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const [reviewForm, setReviewForm] = useState({
    stars: isUpdating ? review.stars : 1,
    activeRating: isUpdating ? review.stars : 1,
    _review: isUpdating ? review.review : "",
    errors: {},
    submittedWithErrors: false,
  });

  useEffect(() => {
    const errorsObj = {};
    if (reviewForm.stars > 5) setReviewForm((prev) => ({ ...prev, stars: 5 }));
    if (reviewForm.stars < 1) setReviewForm((prev) => ({ ...prev, stars: 1 }));
    if (reviewForm._review.length < 10)
      errorsObj.review = "Review must be a minimum of 10 characters";
    if (reviewForm._review.length > 2000)
      errorsObj.review = "Review can only be up to 2000 characters long";
    setReviewForm((prev) => ({ ...prev, errors: errorsObj }));
  }, [reviewForm.stars, reviewForm._review]);

  const handleStarClick = (rating) => {
    setReviewForm((prev) => ({ ...prev, activeRating: rating, stars: rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, stars, _review } = reviewForm;

    if (Object.values(errors).length) {
      setReviewForm((prev) => ({ ...prev, submittedWithErrors: true }));
      return;
    }

    const reviewData = { stars, review: _review };

    if (!isUpdating) {
      dispatch(postNewReviewThunk(itemId, reviewData));
    } else {
      dispatch(updateReviewThunk(review.id, reviewData));
    }

    closeModal();
  };

  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <Title title={"Your Rating"} className="mb-3" />
      <div>
        <div className="text-sky-500 flex gap-1 text-2xl cursor-pointer">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className={`${
                reviewForm.activeRating >= index + 1
                  ? "fas fa-star"
                  : "far fa-star"
              }`}
              onMouseEnter={() => handleStarClick(index + 1)}
              onMouseLeave={() => handleStarClick(reviewForm.stars)}
              onClick={() => handleStarClick(index + 1)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <label className="text-sky-700 font-semibold">Review</label>
        <textarea
          className="p-2 rounded-lg h-[15rem] w-96"
          type="text"
          value={reviewForm._review}
          onChange={(e) =>
            setReviewForm((prev) => ({ ...prev, _review: e.target.value }))
          }
        />
        {reviewForm.submittedWithErrors && reviewForm.errors.review && (
          <p className="errors">{reviewForm.errors.review}</p>
        )}
      </div>
      <SubmitButton type="submit" buttonText="Submit" className="w-full mt-3" />
      {isUpdating && (
        <OpenModalButton
          type="button"
          modalComponent={
            <ConfirmModal
              action="Review Deletion"
              confirm={() => handleDelete(review.id)}
            />
          }
          className="mt-2 font-semibold hover:text-red-600"
          buttonText={"Delete Review"}
        />
      )}
    </form>
  );
};

export default CreateReviewModal;
