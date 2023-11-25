import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";
import "./ItemDetails.css";
import ItemReviews from "../ItemReviews";
import OpenModalButton from "../OpenModalButton";
import DeleteItemModal from "./DeleteItemModal";
import {
  deleteCartItemThunk,
  fetchCartItemsThunk,
  postItemToCart,
} from "../../store/cart";
import ImageCarousel from "./ImageCarousel";
import SubmitButton from "../FormComponents/SubmitButton";
import Loader from "../Loader";

const ItemDetails = () => {
  const { itemId } = useParams();
  const history = useHistory();
  const item = useSelector((state) => state.items.currentItem);
  const user = useSelector((state) => state.session.user);
  const cart = useSelector((state) => state.cart);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchSingleItemThunk(itemId))
      .then(() => {
        if (user) dispatch(fetchCartItemsThunk());
      })
      .then(() => setIsLoading(false));
  }, [dispatch, itemId]);

  if (!item) return null;

  const avgStarRating = item.ProductReviews?.length
    ? (
        item.ProductReviews?.reduce((acc, curr) => {
          return (acc += curr.stars);
        }, 0) / item.ProductReviews?.length
      ).toFixed(2)
    : "No Reviews";

  const itemImages = [item?.previewImage].concat(
    item?.ItemImages?.map((image) => image.url)
  );

  // CART
  const addToCart = async () => {
    dispatch(postItemToCart(item.id));
  };
  const removeFromCart = async (cartItemId) => {
    dispatch(deleteCartItemThunk(cartItemId));
  };
  if (isLoading) return <Loader />;
  return (
    <div>
      <div>
        <div className="flex gap-12 ml-12 mt-8 justify-center">
          <ImageCarousel itemImages={itemImages} />
          <div className="flex flex-col w-[50rem] gap-3">
            <h2 className="text-3xl font-bold underline">{item.name}</h2>
            <p className="bg-slate-300 w-fit px-2 rounded-md underline italic">
              {item?.condition?.charAt(0).toUpperCase() +
                item?.condition?.slice(1)}
            </p>
            <h3 className="font-bold text-2xl">${item.price}</h3>
            <p className="bg-slate-50 p-2 rounded-lg shadow-xl">{item.description}</p>
            <p>
              <i className="star fas fa-star mt-5 mb-3"></i> {avgStarRating} - (
              {item.ProductReviews?.length})
            </p>

            {user &&
              user.id !== item.ownerId &&
              (!Object.values(cart)
                .map((item) => item.itemId)
                .includes(item.id) ? (
                <SubmitButton
                  className=""
                  buttonText="Add To Cart"
                  onClick={addToCart}
                />
              ) : (
                <SubmitButton
                  buttonText="Remove From Cart"
                  onClick={() =>
                    removeFromCart(
                      Object.values(cart).find(
                        (cart) => cart.itemId === item.id
                      ).id
                    )
                  }
                />
              ))}
          </div>
          {/* <p>{item.description}</p> */}
        </div>
        <div id="item-reviews-container">
          <ItemReviews
            reviews={item.ProductReviews}
            item={item}
            stars={avgStarRating}
          />
        </div>
      </div>
    </div>
  );
};
export default ItemDetails;
