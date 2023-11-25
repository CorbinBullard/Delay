import React from "react";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import { CgProfile } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import SubmitButton from "../FormComponents/SubmitButton";

export default function Review({ item, review, isUsers, handleDelete }) {
  return (
    <div key={review.id} className="py-2 pl-1 rounded-lg w-[50rem] flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <CgProfile className={`text-4xl self-center ${isUsers ? "text-sky-600" : ""}`} />
        <p className="font-bold text-3xl">
          {review.User.firstName} {review.User.lastName}
        </p>

        {isUsers && (
          <div className="justify-self-end">
            <OpenModalButton
              buttonText={<FaEdit className="text-2xl cursor-pointer hover:text-sky-500" />}
              modalComponent={
                <CreateReviewModal
                  itemId={review.itemId}
                  isUpdating={true}
                  review={review}
                  handleDelete={handleDelete}
                />
              }
            />
          </div>
        )}
      </div>
      <p className="text-sky-500 text-xl">
        {Array.from({ length: 5 }, (_, index) => (
          <i
            key={index}
            className={`${
              review.stars >= index + 1 ? "fas fa-star" : "far fa-star"
            }`}
          />
        ))}
      </p>
      <p className="review-review">{review.review}</p>
    </div>
  );
}
