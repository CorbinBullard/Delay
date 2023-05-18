import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <ul>
                <li>
                    <NavLink exact to="/">Home</NavLink>
                </li>
                {isLoaded && (
                    <>
                        <li>
                            <ProfileButton user={sessionUser} />
                        </li>
                    </>
                )}
            </ul>
            <button
            onClick={() => history.push('/managelistings')}
            >
                My Store
            </button>

        </>
    );
}

export default Navigation;
