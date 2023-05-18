import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUserItemsThunk } from "../../store/item";
import { useSelector } from "react-redux";
import ItemCard from "../ItemCard";

const ManageListings = () => {
    const dispatch = useDispatch();

    const items = Object.values(useSelector(state => state.items.allItems))

    useEffect(() => {
        dispatch(fetchCurrentUserItemsThunk())
    }, [dispatch])

    if (!items.length) return null

    return (
        <>
            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}
        </>
    )
}
export default ManageListings;
