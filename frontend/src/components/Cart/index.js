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

    if (!items.length) return (
        <div id="cart-empty-page-container">
            <h1>Your Cart is Empty</h1>
            <img src="https://media.sweetwater.com/api/i/f-webp__ha-9ced74217ac8a73c__hmac-0476eb5d2ab94209b4b48c78cc2c64555b5fdf9f/cart/case.png" />
        </div>
    )
    const total = items?.reduce((acc, curr) => acc += curr.Item.price, 0);

    return (
        <div id="cart-page-container">
            <h1>My Cart</h1>
            <div id="cart-page-all-items-container">
                {items.map(item => (
                    <CartItemCard item={item.Item} cartId={item.id} />
                ))}
            </div>
            <div id="cart-page-checkout-container">
                <p id="cart-checkout-total-Price">Total: ${Number(total).toFixed(2) || "Cannot Grab Total"}</p>
                <OpenModalButton
                    buttonText={"Proceed to Checkout"}
                    onButtonClick={checkOutCart}
                    modalComponent={<CartCheckoutModal />}
                />

            </div>
        </div>
    )
}
export default Cart;
