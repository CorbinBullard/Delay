import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function ProfileButton({ user }) {
    const location = useLocation()
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const isEditting = location.pathname.split('/')[location.pathname.split('/').length - 1] === 'edit';

    console.log(isEditting)

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
            document.addEventListener('click', closeMenu);
        })

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => {
        setShowMenu(false);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
    };



    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <> {user ?
            (<>
                <button id='navigation-profile-button' onClick={openMenu}>
                    <i className="fas fa-user-circle" />
                </button>
                <ul className={ulClassName} ref={ulRef}>
                    {(
                        <>
                            <li>{user.username}</li>
                            <li>{user.firstName} {user.lastName}</li>
                            <li>{user.email}</li>
                            {!isEditting && <li>
                                <NavLink id='navigation-create-new-listing' to={'/items/new'}>Create a New Listing</NavLink>
                            </li>}
                            <li>
                                <button
                                    id="navigation-logout-button"
                                    onClick={logout}>Log Out</button>
                            </li>
                        </>
                    )}
                </ul>
            </>) : (
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
            )
        }
        </>
    );
}

export default ProfileButton;
