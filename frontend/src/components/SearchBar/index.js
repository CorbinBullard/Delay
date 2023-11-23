import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import "./SearchBar.css";
import OpenModalButton from "../OpenModalButton";
import FiltersNav from "./FiltersNav";
import { useFilters } from "../../context/Filters";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [activeName, setActiveName] = useState("");
  const [selected, setSelected] = useState(false);
  const { filters, setFilters } = useFilters();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitSearch();
  };

  const submitSearch = () => {
    setFilters({ ...filters, name: activeName });
    setActiveName("");
  };
  return (
    <div id="search-page-container">
      <div id="search-name-container">
        <input
          type="text"
          value={activeName}
          onChange={(e) => setActiveName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i
          id="search-icon"
          className="fas fa-search"
          onClick={submitSearch}
        ></i>
      </div>
      <OpenModalButton
        buttonText={<i class="fas fa-sliders-h"></i>}
        modalComponent={<FiltersNav />}
      />
    </div>
  );
};
export default SearchBar;
