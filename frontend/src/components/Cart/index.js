import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemThunk, fetchCartItemsThunk } from "../../store/cart";
import CartItemCard from "./cartItemCard";
import { Redirect } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import CartCheckoutModal from "./CartCheckoutModal";

const Cart = () => {
    const dispatch = useDispatch();
    const items = Object.values(useSelector(state => state.cart));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) dispatch(fetchCartItemsThunk())
    }, []);


    const checkOutCart = () => {
        items?.forEach(item => {
            dispatch(deleteCartItemThunk(item.id));
        });

    }

    if (!user) return <Redirect to={'/'} />

    if (!items.length) return <h1>Your Cart is Empty</h1>;
    return (
        <div id="cart-page-container">
            <h1>My Cart</h1>
            <div id="cart-page-all-items-container">
                {items.map(item => (
                    <CartItemCard item={item.Item} cartId={item.id} />
                ))}
            </div>
            <div id="cart-page-checkout-container">
                <p id="cart-checkout-total-Price">Total: ${items.reduce((acc, curr) => acc += curr.Item.price, 0)}</p>
                <OpenModalButton
                    buttonText={"Proceed to Checkout"}
                    onButtonClick={checkOutCart}
                    modalComponent={<CartCheckoutModal /> }
                />

            </div>
        </div>
    )
}
export default Cart;
