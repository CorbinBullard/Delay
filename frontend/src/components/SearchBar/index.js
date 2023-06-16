import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import "./SearchBar.css"
import OpenModalButton from "../OpenModalButton";
import FiltersNav from "./FiltersNav";
import { useFilters } from "../../context/Filters";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [activeName, setActiveName] = useState('')

    const {
        name,
        minPrice,
        maxPrice,
        brand,
        condition,
        year,
        setName,
        setMinPrice,
        setMaxPrice,
        setBrand,
        setCondition,
        setYear
    } = useFilters();


    const submitSearch = () => {
        // dispatch(fetchAllItemsThunk(name, minPrice, maxPrice, brand, condition, year));
        setName(activeName);
        setActiveName('')
    }
    return (
        <div id="search-page-container">
            <div id="search-name-container">
                <input type="text"
                    value={activeName}
                    onChange={e => setActiveName(e.target.value)}
                // onSelect={() => setSelected(true)}
                // onBlur={() => setSelected(false)}
                // onKeyDown={handleKeyDown}
                />
                <i id="search-icon" className="fas fa-search" onClick={submitSearch}></i>
            </div>
            <OpenModalButton
                buttonText={<i class="fas fa-sliders-h"></i>}
                modalComponent={<FiltersNav />} />

        </div>
    )
}
export default SearchBar;
