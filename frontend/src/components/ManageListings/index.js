import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItemThunk, fetchCurrentUserItemsThunk } from "../../store/item";
import { useSelector } from "react-redux";
import ItemCard from "../ItemCard";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";
import ItemCardOwner from "../ItemCard/ItemCardOwner";
import { useModal } from "../../context/Modal";

const ManageListings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const items = Object.values(useSelector((state) => state.items.allItems));
  const [isLoading, setIsLoading] = useState(false);

  const deleteItem = (id) => {
    dispatch(deleteItemThunk(id)).then(() => closeModal());
  }

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
    setIsLoading(true);
    fetchUserListings();
  }, [dispatch]);

  async function fetchUserListings() {
    const items = await dispatch(fetchCurrentUserItemsThunk());
    // setItemArr(items);
    setIsLoading(false);
  }

  if (!items.length) return null;
  if (isLoading) return <Loader />;

  return (
    <div id="home-page-container" className="mt-4">
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <ItemCardOwner key={item.id} item={item} handleDelete={deleteItem} />
        ))}
      </div>
    </div>
  );
};
export default ManageListings;
