import "./HomePage.css";
import { fetchAllItemsThunk } from "../../store/item";
import ItemCard from "../ItemCard";
import { fetchCartItemsThunk } from "../../store/cart";
import { useFilters } from "../../context/Filters";
import { act } from "react-dom/test-utils";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
const { useState, useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");


const HomePage = () => {
  const user = useSelector((state) => state.session.user);

  const { filters, setFilters } = useFilters();


  const dispatch = useDispatch();

  const items = Object.values(useSelector((state) => state.items.allItems));
  return (
    <div id="home-page-container">
      <div id="filters-container">
        {Object.keys(filters).map(
          (key) =>
            filters[key] && (
              <span
                className="text-sm italic px-2 cursor-pointer w-fit flex items-center gap-1 hover:text-red-500"
                onClick={() => {
                  setFilters({ ...filters, [key]: "" });
                }}
              >
                {key}: {filters[key]} <MdOutlineRemoveCircleOutline />
              </span>
            )
        )}
      </div>
      {items.length ? (
        <div id="home-page-all-items">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div id="no-results">
          <img src="https://media.sweetwater.com/api/i/f-webp__ha-9ced74217ac8a73c__hmac-0476eb5d2ab94209b4b48c78cc2c64555b5fdf9f/cart/case.png" />
          <h2>{` does not match any listing...`}</h2>
          <p>Please remove your search parameters and try again</p>
        </div>
      )}
    </div>
  );
};
export default HomePage;
