import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div id='navigation-page-container'>
            <ul>
                <li >
                    <NavLink id='navigation-home-button' exact to="/"><i className="fab fa-dyalog"></i>elay</NavLink>
                </li>
                {isLoaded && (

                    <li id='navigation-profile-store'>
                        {sessionUser && <button
                            id='navigation-my-store-button'
                            onClick={() => history.push('/managelistings')}
                        >
                            My Store
                        </button>}
                        <ProfileButton user={sessionUser} />
                    </li>

                )}
            </ul>


        </div>
    );
}

export default Navigation;
