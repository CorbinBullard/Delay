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
    <div className="flex gap-4">
      <div className="bg-white min-w-[35vw] flex border-gray-700 rounded-md">
        <input
        className="text-lg border-none w-[100%] rounded-md focus:outline-none pl-3"
          type="text"
          value={activeName}
          onChange={(e) => setActiveName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i
          className="fas fa-search text-xl text-gray-700 hover:text-gray-900 cursor-pointer self-center pr-3"
          onClick={submitSearch}
        ></i>
      </div>
      <OpenModalButton
        buttonText={<i class="fas fa-sliders-h"></i>}
        modalComponent={<FiltersNav />}
        className="bg-sky-500 rounded-md p-1 hover:bg-sky-600 text-zinc-100 shadow-sm w-12 text-xl"
      />
    </div>
  );
};
export default SearchBar;
