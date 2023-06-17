import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from '../SearchBar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchAllItemsThunk } from '../../store/item';
import { useFilters } from '../../context/Filters';

function Navigation({ isLoaded }) {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const cartLength = Object.values(useSelector(state => state.cart)).length;
    const location = useLocation();
    const dispatch = useDispatch();

    const {
        name,
        minPrice,
        maxPrice,
        brand,
        condition,
        year,
        instrumentType
    } = useFilters();

    return (
        <div id='navigation-page-container'>
            <ul>
                <li >
                    <NavLink id='navigation-home-button' exact to="/"
                        onClick={() => dispatch(fetchAllItemsThunk(name, minPrice,
                            maxPrice,
                            brand,
                            condition,
                            year,
                            instrumentType))}><i className="fab fa-dyalog"></i>elay</NavLink>
                </li>
                {isLoaded && (
                    <>
                        {location.pathname === '/' && <li>
                            <SearchBar />
                        </li>}
                        <li id='navigation-profile-store'>
                            {sessionUser &&
                                <>
                                    <button
                                        id='navigation-my-cart-button'
                                        onClick={() => history.push('/cart')}>
                                    <i className={"fas fa-shopping-cart"}><p id={`${cartLength ? 'cart-length' : 'cart-length-hidden'}`} >{cartLength ? cartLength : ""}</p></i>
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
                    </>
                )}
            </ul>


        </div>
    );
}

export default Navigation;
