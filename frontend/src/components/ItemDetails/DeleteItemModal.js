import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteItemThunk } from "../../store/item";
import { useHistory } from "react-router";

const DeleteItemModal = ({ itemId }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteItemThunk(itemId))
        history.push('/');
        closeModal()
    }


    return (
        <div id="confirm-delete-container">
            <h2>Confirm Delete?</h2>
            <div id="confirm-delete-buttons">
                <button
                    id="confirm-delete-delete"
                    onClick={handleDelete}
                >Delete</button>
                <button
                    id="confirm-delete-cancel"
                    onClick={closeModal}>Cancel</button>
            </div>
        </div>
    )
}
export default DeleteItemModal;
