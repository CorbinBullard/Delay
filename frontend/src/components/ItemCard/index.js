
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
                <p>{item.name}</p>
                <h3>{item.price}</h3>
                <p>{item.condition}</p>
            </div>
        </div>
    )
}
export default ItemCard;
