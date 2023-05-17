import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                )}
            </ul>
            {sessionUser && <NavLink to={'/items/new'}>Create a New Listing</NavLink>}

        </>
    );
}

export default Navigation;
