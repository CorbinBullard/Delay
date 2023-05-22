import "./HomePage.css"
import { fetchAllItemsThunk } from '../../store/item';
import ItemCard from '../ItemCard';
import { fetchCartItemsThunk } from "../../store/cart";
const { useState, useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux');

const HomePage = () => {
    const user = useSelector(state => state.session.user)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllItemsThunk());
        if (user) dispatch(fetchCartItemsThunk());
    }, [dispatch, user])

    const items = Object.values(useSelector(state => state.items.allItems));
    // const loadItems = async () => {
    //     const _items = await
    //     setItems(Object.values(_items))
    // }

    if (!items.length) return null

    return (
        <div id="home-page-container">
            <div id='home-page-all-items'>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
export default HomePage;
