import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

import SubmitButton from "../FormComponents/SubmitButton";

function ProfileButton({ user }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const isEditing =
    location.pathname.split("/")[location.pathname.split("/").length - 1] ===
    "edit";

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", closeMenu);
    });

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {" "}
      {user ? (
        <>
          <button className="text-3xl mr-12 bg-slate-200 w-20 rounded-3xl flex justify-center items-center gap-2 border-2 border-sky-900 hover:border-sky-500 group shadow-lg" onClick={openMenu}>
            <FaGripLines className="text-2xl" />
            <i className="fas fa-user-circle text-sky-800 group-hover:text-sky-500" />
          </button>
          {showMenu && (
            <ul
              className="absolute right-5 top-20 border-sky-500 bg-sky-50 flex flex-col gap-2 p-4 rounded-md border"
              ref={ulRef}
            >
              {
                <>
                  <li className="font-bold underline text-xl">{user.username}</li>
                  <li>
                    {user.firstName} {user.lastName}
                  </li>
                  <li className="italic">{user.email}</li>
                  {!isEditing && (
                    <li>
                      <NavLink
                        className="text-sky-800 hover:text-sky-500 font-semibold"
                        to={"/items/new"}
                      >
                        Create a New Listing
                      </NavLink>
                    </li>
                  )}
                  <SubmitButton buttonText={"Logout"} onClick={logout} />
                </>
              }
            </ul>
          )}
        </>
      ) : (
        <div id="logged-out-container">
          <OpenModalMenuItem
            itemText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
          />
          <OpenModalMenuItem
            itemText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </>
  );
}

export default ProfileButton;
