import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import "./SearchBar.css"

const SearchBar = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');



    const submitSearch = () => {
        dispatch(fetchAllItemsThunk(name));
        
    }
    return (
        <div id="search-page-container">
            <div id="search-name-container">
                <input type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    // onSelect={() => setSelected(true)}
                    // onBlur={() => setSelected(false)}
                // onKeyDown={handleKeyDown}
                />
                <i id="search-icon" className="fas fa-search" onClick={submitSearch}></i>
            </div>
        </div>
    )
}
export default SearchBar;
