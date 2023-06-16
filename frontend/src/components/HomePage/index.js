import "./HomePage.css"
import { fetchAllItemsThunk } from '../../store/item';
import ItemCard from '../ItemCard';
import { fetchCartItemsThunk } from "../../store/cart";
import { useFilters } from "../../context/Filters";
const { useState, useEffect } = require('react');
const { useDispatch, useSelector } = require('react-redux');

const HomePage = () => {
    const user = useSelector(state => state.session.user);

    const {
        name,
        instrumentType,
        minPrice,
        maxPrice,
        brand,
        condition,
        year,
        setInstrumentType,
        setName,
        setMinPrice,
        setMaxPrice,
        setBrand,
        setCondition,
        setYear
    } = useFilters();

    const dispatch = useDispatch();
    const resetFilters = () => {
        setInstrumentType('')
        setName('')
        setMinPrice('')
        setMaxPrice('')
        setBrand('')
        setCondition('')
        setYear('')
    }

    useEffect(() => {
        dispatch(fetchAllItemsThunk());
        if (user) dispatch(fetchCartItemsThunk());
    }, [dispatch, user, name])

    const items = Object.values(useSelector(state => state.items.allItems));


    // const loadItems = async () => {
    //     const _items = await
    //     setItems(Object.values(_items))
    // }

    if (!items.length) return null

    return (
        <div id="home-page-container">
            <div id="filters-container">
                {minPrice && (
                    <div className="current-filter-container"
                        onClick={() => setMinPrice('')}
                    >Min Price: {minPrice} X</div>
                )}
                {maxPrice && (
                    <div className="current-filter-container"
                        onClick={() => setMaxPrice('')}
                    >Max Price: {maxPrice} X</div>
                )}
                {brand && (
                    <div className="current-filter-container"
                        onClick={() => setBrand('')}
                    >Brand: {brand} X</div>
                )}
                {condition && (
                    <div className="current-filter-container"
                        onClick={() => setCondition('')}
                    >Condition: {condition} X</div>
                )}
                {year && (
                    <div className="current-filter-container"
                        onClick={() => setYear('')}
                    >Year: {year} X</div>
                )}
                {instrumentType && (
                    <div className="current-filter-container"
                        onClick={() => setInstrumentType('')}
                    >Type: {instrumentType} X</div>
                )}
                {/* {maxPrice && (
                    <div className="current-filter-container">max Price: {maxPrice} <button onClick={() => {
                        setMaxPrice('')
                    }}>X</button></div>
                )} */}
            </div>
            <div id='home-page-all-items'>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
export default HomePage;
