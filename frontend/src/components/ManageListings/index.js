import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUserItemsThunk } from "../../store/item";
import { useSelector } from "react-redux";
import ItemCard from "../ItemCard";
import { useHistory } from "react-router-dom"


const ManageListings = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const items = Object.values(useSelector(state => state.items.allItems))

    useEffect(() => {
        if (!user) {
            return history.push('/');
        }
        dispatch(fetchCurrentUserItemsThunk())
    }, [dispatch])



    if (!items.length) return null

    return (
        <div id="home-page-container">
            <div id='home-page-all-items'>
                {items.map((item) => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}
export default ManageListings;
