const DeleteReviewModal = ({ reviewId }) => {

    const handleDelete = () => {

    }


    return (
        <>
            <h2>Confirm Delete?</h2>
            <button
                onClick={handleDelete}
            >Delete</button>
            <button>Cancel</button>
        </>
    )
}
export default DeleteReviewModal;
