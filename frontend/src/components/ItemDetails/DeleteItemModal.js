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
export default DeleteItemModal;
