import "./ListingForm.css"
import { object } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewImageThunk, postNewItemThunk, updateNewItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";


const ListingForm = ({ isUpdating }) => {
    const params = useParams();

    const item = useSelector(state => state.items.allItems[params.itemId])
    const itemId = item?.id
    const dispatch = useDispatch();
    const history = useHistory();


    const [name, setName] = useState(item ? item.name : "");
    const [brand, setBrand] = useState(item ? item.brand : "");
    const [price, setPrice] = useState(item ? item.price : "");
    const [description, setDescription] = useState(item ? item.description : "");
    const [instrumentType, setInstrumentType] = useState(item ? item.instrumentType : "");
    const [year, setYear] = useState(item ? item.year : "");
    const [condition, setCondition] = useState(item ? item.condition : "");
    const [previewImage, setpreviewImage] = useState(item ? item.previewImage : "");

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");

    const [errors, setErrors] = useState({});
    const [submittedWithErrors, setSubmittedWithErrors] = useState(false);


    const currentYear = new Date().getFullYear()


    useEffect(() => {
        const errorsObj = {};
        if (!name) errorsObj.name = "Item name is required";
        if (!condition) errorsObj.condition = "Select a condition for your Item";
        if (!instrumentType) errorsObj.instrumentType = "Select a type for your Item";
        if (!brand) errorsObj.brand = "Item brand is required";
        if (!price) errorsObj.price = "Price is required";
        if (price && isNaN(+price)) errorsObj.price = "Price must be a number";
        if (!description) errorsObj.description = "Item description is required";
        if (description && description.length < 10) errorsObj.description = "Item description must be at least 10 Characters"
        if (!year) errorsObj.year = "Item Year is required";
        if (year && year > currentYear) errorsObj.year = "Year cannot be greater than current year";
        if (year && isNaN(+year)) errorsObj.year = "Year must be a number";
        if (!previewImage) errorsObj.previewImage = "A preview Image of your Item is required";
        if (previewImage && !isValidUrl(previewImage)) errorsObj.previewImage = "Image URL must end in .png, .jpg or .jpeg";

        // NON PREVIEW IMAGES
        if (image1 && !isValidUrl(image1)) errorsObj.image1 = "Image URL must end in .png, .jpg or .jpeg";
        if (image2 && !isValidUrl(image2)) errorsObj.image2 = "Image URL must end in .png, .jpg or .jpeg";

        setErrors(errorsObj)

    }, [name, brand, price, description, year, previewImage, condition, instrumentType, image1, image2])


    const isValidUrl = (url) => {
        const imageFormatTypes = ['jpg', 'jpeg', 'png'];
        const urlArr = url.split('.');
        if (imageFormatTypes.includes(urlArr[urlArr.length - 1])) return true;
        else {
            return false
        };
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) {
            setSubmittedWithErrors(true)
            return alert("Cannot Submit")
        }
        const newItem = {
            name,
            brand,
            price,
            description,
            instrumentType,
            year,
            condition,
            previewImage
        }
        if (!isUpdating) {
            const item = await dispatch(postNewItemThunk(newItem))
            postImages(item.id)



            return history.push(`/items/${item.id}`);
        } else {

            const item = await dispatch(updateNewItemThunk(itemId, newItem))
                .then((item) => postImages(item.id))

            return history.push(`/items/${itemId}`);
        }
    }
    async function postImages(itemId) {
        if (image1) {
            await dispatch(postNewImageThunk(itemId, image1))
        }
        if (image2) {
            await dispatch(postNewImageThunk(itemId, image2))
        }
    }

    const instrumentTypeOptions = [
        { value: "", label: 'Select an Instrument Type' },
        { value: 'guitar', label: 'Guitar' },
        { value: 'bass', label: 'Bass' },
        { value: 'drum', label: 'Drum' },
        { value: 'keyboard', label: 'Keyboard' },
        { value: 'other', label: 'Other' }
    ]

    const conditionOptions = [
        { value: "", label: 'Select a condition' },
        { value: 'new', label: 'New' },
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'poor', label: 'Poor' }
    ]



    return (
        <div id="listing-form-page-container">
            <h2>Tell us about your Instrument</h2>
            <form
                id="listing-form-form"
                onSubmit={handleSubmit}>
                <div className="input-component">
                    <label>Name and Model</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.name &&
                        <p className="errors">{errors.name}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.brand &&
                        <p className="errors">{errors.brand}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.price &&
                        <p className="errors">{errors.price}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Description</label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    {submittedWithErrors && errors.description &&
                        <p className="errors">{errors.description}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Instrument Type</label>
                    <select
                        value={instrumentType}
                        onChange={e => setInstrumentType(e.target.value)}>
                        {instrumentTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {submittedWithErrors && errors.instrumentType &&
                        <p className="errors">{errors.instrumentType}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Year</label>
                    <input
                        type="text"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.year &&
                        <p className="errors">{errors.year}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Condition</label>
                    <select
                        value={condition}
                        onChange={e => setCondition(e.target.value)}>
                        {conditionOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {submittedWithErrors && errors.condition &&
                        <p className="errors">{errors.condition}</p>
                    }
                </div>
                <div className="input-component">
                    <label>Preview Image</label>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={e => setpreviewImage(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.previewImage &&
                        <p className="errors">{errors.previewImage}</p>
                    }
                </div>
                {/* NON PREVIEW IMAGES!!!!!!!!!!!! */}
                {
                    <>
                        <div className="input-component">
                            <label>Image 1 (Optional)</label>
                            <input
                                type="text"
                                value={image1}
                                onChange={e => setImage1(e.target.value)}
                            ></input>
                            {submittedWithErrors && errors.image1 &&
                                <p className="errors">{errors.image1}</p>
                            }
                        </div>
                        <div className="input-component">
                            <label>Image 2 (Optional)</label>
                            <input
                                type="text"
                                value={image2}
                                onChange={e => setImage2(e.target.value)}
                            ></input>
                            {submittedWithErrors && errors.image2 &&
                                <p className="errors">{errors.image2}</p>
                            }
                        </div>
                    </>
                }
                <button
                    id="list-form-submit-button">
                    {isUpdating ? "Update Listing" : "Create Listing"}
                </button>
            </form>
        </div>
    )



}
export default ListingForm;
