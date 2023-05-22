import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const cartLength = Object.values(useSelector(state => state.cart)).length;

    return (
        <div id='navigation-page-container'>
            <ul>
                <li >
                    <NavLink id='navigation-home-button' exact to="/"><i className="fab fa-dyalog"></i>elay</NavLink>
                </li>
                {isLoaded && (

                    <li id='navigation-profile-store'>
                        {sessionUser &&
                            <>
                                <button
                                    id='navigation-my-cart-button'
                                    onClick={() => history.push('/cart')}>
                                    <i class="fas fa-shopping-cart">{cartLength ? cartLength : ""}</i>
                                    {/* {cartLength > 0 &&
                                        <p id='cart-length'>{cartLength}</p>
                                    } */}
                                </button>
                                <button
                                    id='navigation-my-store-button'
                                    onClick={() => history.push('/managelistings')}
                                >
                                    My Store
                                </button>
                            </>
                        }
                        <ProfileButton user={sessionUser} />
                    </li>

                )}
            </ul>


        </div>
    );
}

export default Navigation;
