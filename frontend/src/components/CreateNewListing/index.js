import { object } from "prop-types";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewItemThunk } from "../../store/item";
import { useHistory } from "react-router";


const CreateNewListing = ({ item }) => {
    const user = useSelector(state => state.session.user)
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

    const [errors, setErrors] = useState({});
    const [submittedWithErrors, setSubmittedWithErrors] = useState(false);

    useEffect(() => {
        const errorsObj = {};
        if (!name) errorsObj.name = "Item name is required";
        if (!condition) errorsObj.condition = "Select a condition for your Item";
        if (!instrumentType) errorsObj.instrumentType = "Select a type for your Item";
        if (!brand) errorsObj.brand = "Item brand is required";
        if (!price) errorsObj.price = "Price is required";
        if (!year) errorsObj.year = "Item Year is required";
        if (!previewImage) errorsObj.previewImage = "A preview Image of your Item is required";
        if (previewImage && !isValidUrl(previewImage)) errorsObj.previewImage = "Image URL must end in .png, .jpg or .jpeg"

        setErrors(errorsObj)

    }, [name, brand, price, description, year, previewImage, condition, instrumentType])


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
        // console.log("Submitted", user)
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
        const item = await dispatch(postNewItemThunk(newItem))
        history.push(`/items/${item.id}`);
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
        { value: "", label: 'Select an Instrument Type' },
        { value: 'new', label: 'New' },
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'poor', label: 'Poor' }
    ]
    console.log("Instrument Type : ", instrumentType)

    return (
        <>
            <h2>Tell us about your Instrument</h2>
            <form
                onSubmit={handleSubmit}>
                <div className="input Component">
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
                <div className="input Component">
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
                <div className="input Component">
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
                <div className="input Component">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></input>
                    {submittedWithErrors && errors.description &&
                        <p className="errors">{errors.description}</p>
                    }
                </div>
                <div className="input Component">
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
                <div className="input Component">
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
                <div className="input Component">
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
                <div className="input Component">
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
                <button>Create Listing</button>
            </form>
        </>
    )



}
export default CreateNewListing;
