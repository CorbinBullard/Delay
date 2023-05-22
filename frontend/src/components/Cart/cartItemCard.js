
// import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import "./Cart.css"
import { deleteCartItemThunk } from "../../store/cart";
const CartItemCard = ({ cartId, item }) => {
    const dispatch = useDispatch();
    // const history = useHistory()

    const removeFromCart = async () => {
        await dispatch(deleteCartItemThunk(cartId));
    }

    return (
        <div
            // onClick={handleClick}
            className="cart-item-card-container">
            <img className="cart-item-card-image" src={item.previewImage} />
            <div className="cart-item-card-info">
                <p className="cart-item-card-name">{item.name}</p>
                <div className="cart-item-info/remove-btn">
                    <p className="cart-item-card-price">${item.price}</p>
                    <p className="cart-item-card-condition">{item.condition}</p>
                    <p className="cart-item-card-shipping"><i className="fas fa-truck"> - Free Shipping</i></p>
                    <button
                        onClick={removeFromCart}
                        className="cart-item-remove-item-button">Remove Item <i class="fas fa-times"></i></button>
                </div>
            </div>

        </div>
    )
}
export default CartItemCard;
