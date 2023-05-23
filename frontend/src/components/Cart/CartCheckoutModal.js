import { useModal } from "../../context/Modal"
import "./Cart.css"
const CartCheckoutModal = () => {
    const { closeModal } = useModal();

    return (
        <div id="cart-checkout-modal-page">
            <h3>Thank you for your pruchase!</h3>
            {/* <i className="fas fa-check"></i> */}
            <button
                onClick={closeModal}
            >Ok</button>
        </div>
    )
}
export default CartCheckoutModal;
