import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/item";

const DeleteReviewModal = ({ reviewId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteReviewThunk(reviewId))
        closeModal();
    }


    return (
        <>
            <h2>Confirm Delete?</h2>
            <button
                onClick={handleDelete}
            >Delete</button>
            <button
                onClick={closeModal}>Cancel</button>
        </>
    )
}
export default DeleteReviewModal;
