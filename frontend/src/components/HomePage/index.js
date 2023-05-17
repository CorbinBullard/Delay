import { fetchAllItemsThunk } from '../../store/item';
const { useState, useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux')
const HomePage = () => {


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllItemsThunk());
    }, [dispatch])

    const items = Object.values(useSelector(state => state.items.allItems))
    // const loadItems = async () => {
    //     const _items = await
    //     setItems(Object.values(_items))
    // }

    if (!items.length) return null

    return (
        // <h2>items</h2>
        <>
           {items.map((item) => (
            <div key={item.id}>{item.name}</div>
           ))}
        </>
    )
}
export default HomePage;
