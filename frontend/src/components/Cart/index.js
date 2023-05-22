import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsThunk } from "../../store/cart";
import CartItemCard from "./cartItemCard";
import { Redirect } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const items = Object.values(useSelector(state => state.cart));
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        if (user) dispatch(fetchCartItemsThunk())
    }, [])

    if (!user) return <Redirect to={'/'} />

    if (!items.length) return null;
    return (
        <div id="cart-page-container">
            <h1>My Cart</h1>
            <div id="cart-page-all-items-container">
                {items.map(item => (
                    <CartItemCard item={item.Item} cartId={item.id} />
                ))}
            </div>
        </div>
    )
}
export default Cart;
