import { useHistory } from "react-router";
import "./ItemCard.css";
const ItemCard = ({ item }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/items/${item.id}`);
  };

  return (
    <div onClick={handleClick} className="w-52 h-90 group cursor-pointer group flex flex-col">
      <img className="w-52 h-52 object-cover rounded-lg shadow-md group-hover:shadow-xl" src={item.previewImage} />
      <div className="ml-1">
        <p className="mt-2 font-semibold underline group-hover:text-sky-500">
          {item.name.length > 45 ? item.name.slice(0, 45) + "..." : item.name}
        </p>
        <p className="font-bold text-lg italic">${item.price}</p>
        <p className="italic">Condition: {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}</p>
        <p className="item-card-shipping">
          <i className="fas fa-truck"> - Free Shipping</i>
        </p>
      </div>
    </div>
  );
};
export default ItemCard;
