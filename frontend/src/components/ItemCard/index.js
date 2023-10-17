
import { useHistory } from "react-router"
import "./ItemCard.css"
const ItemCard = ({ item }) => {

    const history = useHistory()
    const handleClick = () => {

        history.push(`/items/${item.id}`)
    }

    return (
        <div
            onClick={handleClick}
            className="item-card-container">
            <img className="item-card-image" src={item.previewImage} />
            <div className="item-card-info">
                <p className="item-card-name">{item.name}</p>
                <p className="item-card-price">${item.price}</p>
                <p className="item-card-condition">{item.condition}</p>
                <p className="item-card-shipping"><i className="fas fa-truck"> - Free Shipping</i></p>
            </div>

        </div>
    )
}
export default ItemCard;
