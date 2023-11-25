import { useDispatch, useSelector } from "react-redux";
import "./ItemReviews.css";
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import Review from "./Review";
import SubmitButton from "../FormComponents/SubmitButton";
import { deleteReviewThunk } from "../../store/item";
import { useModal } from "../../context/Modal";

const ItemReviews = ({ item, reviews }) => {
  const user = useSelector((state) => state.session.user);
  const reviewUserIds = reviews?.map((review) => review.User.id);
  const dispatch = useDispatch();
  const orderedReveiws = reviews?.sort(sortFn);

  function sortFn(a, b) {
    const aDate = new Date(a.createdAt).getTime();
    const bDate = new Date(b.createdAt).getTime();

    if (aDate > bDate) return -1;
    else return 1;
  }

  const { closeModal } = useModal();

  const handleDelete = (id) => {
    dispatch(deleteReviewThunk(id));
    closeModal();
  };

  if (!reviews) return null;

  return (
    <div>
      <h2 className="font-bold text-2xl my-3">
        {reviews?.length ? "Product reviews" : "This item has no reviews"}
      </h2>
      <div>
        {user &&
          !reviewUserIds.includes(user.id) &&
          item.ownerId !== user.id && (
            <OpenModalButton
              buttonText={<SubmitButton buttonText={"Add Your Review!"} />}
              modalComponent={
                <CreateReviewModal itemId={item.id} isUpdating={false} />
              }
            />
          )}
      </div>
      <div>
        {orderedReveiws?.map((review) => (
          <Review
            handleDelete={handleDelete}
            key={review.id}
            review={review}
            isUsers={review.User.id === user.id}
          />
        ))}
      </div>
    </div>
  );
};
export default ItemReviews;
