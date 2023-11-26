import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "../SearchBar";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllItemsThunk } from "../../store/item";
import { useFilters } from "../../context/Filters";
import SubmitButton from "../FormComponents/SubmitButton";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const cartLength = Object.values(useSelector((state) => state.cart)).length;
  const location = useLocation();
  const dispatch = useDispatch();

  const { name, minPrice, maxPrice, brand, condition, year, instrumentType } =
    useFilters();

  return (
    <div id="navigation-page-container">
      <ul>
        <li>
          <NavLink
            className="text-sky-800 pl-12 text-4xl"
            id="navigation-home-button"
            exact
            to="/"
            onClick={() =>
              dispatch(
                fetchAllItemsThunk(
                  name,
                  minPrice,
                  maxPrice,
                  brand,
                  condition,
                  year,
                  instrumentType
                )
              )
            }
          >
            <i className="fab fa-dyalog  text-4xl"></i>elay
          </NavLink>
        </li>
        {isLoaded && (
          <>
            {location.pathname === "/" && (
              <li>
                <SearchBar />
              </li>
            )}
            <li id="navigation-profile-store">
              {sessionUser && (
                <>
                  <button
                    id="navigation-my-cart-button"
                    onClick={() => history.push("/cart")}
                  >
                    <div className="relative">
                      <i className="fas fa-shopping-cart">
                        <p
                        className={`absolute top-1.5 right-2.5 text-white text-lg   rounded-2xl${""}`}
                        >
                          {cartLength ? cartLength : ""}
                        </p>
                      </i>
                    </div>
                    {/* {cartLength > 0 &&
                                        <p id='cart-length'>{cartLength}</p>
                                    } */}
                  </button>
                  <SubmitButton
                    id="navigation-my-store-button"
                    onClick={() => history.push("/managelistings")}
                    buttonText={"My Store"}
                  />
                </>
              )}
              <ProfileButton user={sessionUser} />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
