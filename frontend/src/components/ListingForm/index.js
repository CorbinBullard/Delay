import "./ListingForm.css";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImageThunk, postNewImageThunk, postNewItemThunk, updateNewItemThunk } from "../../store/item";
import { useHistory, useParams } from "react-router";
import { fetchSingleItemThunk } from "../../store/item";


const ListingForm = ({ isUpdating }) => {
    const params = useParams();
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const item = useSelector(state => state.items.currentItem)
    const itemId = item?.id

    const [name, setName] = useState(isUpdating ? item.name : "");
    const [brand, setBrand] = useState(isUpdating ? item.brand : "");
    const [price, setPrice] = useState(isUpdating ? item.price : "");
    const [description, setDescription] = useState(isUpdating ? item.description : "");
    const [instrumentType, setInstrumentType] = useState(isUpdating ? item.instrumentType : "");
    const [year, setYear] = useState(isUpdating ? item.year : "");
    const [condition, setCondition] = useState(isUpdating ? item.condition : "");
    const [previewImage, setpreviewImage] = useState(isUpdating ? item.previewImage : "");
    const [changePreview, setChangePreview] = useState(false)
    const lastPreviewImage = useSelector(state => state.items.currentItem.previewImage);
    // NON PREVIEW IMAGES vv
    const [imageArr, setImageArr] = useState(isUpdating ? item.ItemImages : []);
    const [newActiveImage, setNewActiveImage] = useState("");
    // NON PREVIEW IMAGES ^^

    const [errors, setErrors] = useState({});
    const [submittedWithErrors, setSubmittedWithErrors] = useState(false);



    const currentYear = new Date().getFullYear()

    // This will repopulate fields on refresh
    useEffect(() => {
        if (isUpdating) fetchAndSet();
    }, [dispatch, user]);

    async function fetchAndSet() {
        const item = await dispatch(fetchSingleItemThunk(params.itemId));
        console.log(item);
        setName(item.name);
        setBrand(item.brand);
        setPrice(item.price);
        setDescription(item.description);
        setInstrumentType(item.instrumentType);
        setYear(item.year);
        setCondition(item.condition);
        setpreviewImage(item.previewImage);
        setImageArr(item.ItemImages);
    }



    useEffect(() => {
        const errorsObj = {};
        if (!name) errorsObj.name = "Item name is required";
        if (!condition) errorsObj.condition = "Select a condition for your Item";
        if (!instrumentType) errorsObj.instrumentType = "Select a type for your Item";
        if (!brand) errorsObj.brand = "Item brand is required";
        if (!price) errorsObj.price = "Price is required";
        if (price && isNaN(+price)) errorsObj.price = "Price must be a number";
        if (price && !isNaN(+price) && price < 0) errorsObj.price = "Price cannot be negative"
        if (!description) errorsObj.description = "Item description is required";
        if (description && description.length < 10) errorsObj.description = "Item description must be at least 10 Characters"
        if (!year) errorsObj.year = "Item Year is required";
        if (year && year > currentYear) errorsObj.year = "Year cannot be greater than current year";
        if (year && isNaN(+year)) errorsObj.year = "Year must be a number";
        if (!previewImage) errorsObj.previewImage = "A preview Image of your Item is required";
        // if (previewImage && !isValidUrl(previewImage)) errorsObj.previewImage = "Image URL must end in .png, .jpg or .jpeg";

        // NON PREVIEW IMAGES
        // if (newActiveImage && !isValidUrl(newActiveImage)) errorsObj.newActiveImage = "Image URL must end in .png, .jpg or .jpeg";


        setErrors(errorsObj)

    }, [name, brand, price, description, year, previewImage, condition, instrumentType, imageArr, newActiveImage])


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
            return
        }
        const newItem = {
            name,
            brand,
            price,
            description,
            instrumentType,
            year,
            condition,
            previewImage // This will be the first image uploaded
        }
        if (!isUpdating) {
            const item = await dispatch(postNewItemThunk(newItem));
            postImages(item.id);
            return history.push(`/items/${item.id}`);
        } else {
            const item = await dispatch(updateNewItemThunk(itemId, newItem));
            return history.push(`/items/${itemId}`);
        }
    }

    async function postImages(itemId) {// Change this to upload first image as preview image
        if (imageArr.length) {
            for (let i = 0; i < imageArr.length; i++) {
                await dispatch(postNewImageThunk(itemId, imageArr[i]))
            }
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
    // NON PREVIEW IMAGES

    const addImage = async () => {
        if (imageArr?.length >= 5) return alert("Item cannot have more than 5 images");
        if (newActiveImage) {
            if (isUpdating) {
                const image = await dispatch(postNewImageThunk(itemId, newActiveImage));
                setImageArr([...imageArr, image])

                setNewActiveImage("");
            } else {
                console.log("Active Image : ", newActiveImage)
                setImageArr([...imageArr, newActiveImage]);
                setNewActiveImage("");
            }
        }
    }

    const removeImage = imageId => {
        if (isUpdating) {
            dispatch(deleteImageThunk(imageId))
            setImageArr(imageArr.filter(image => image.id !== imageId))
        } else {

            const newImageArr = [];
            imageArr.forEach((image, index) => {
                if (index !== imageId) newImageArr.push(image);
            });
            setImageArr(newImageArr)
            // setImageArr(imageArr.filter(image => image.id !== imageId));
        }
    }

    if (isUpdating && !item) {
        return null;
    }
    if (!user) return <Redirect to="/" />

    console.log(newActiveImage)

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
                    {!isUpdating ?
                        (<input
                            className="file-input"
                            type="file"
                            // value={previewImage}
                            onChange={e => setpreviewImage(e.target.files[0])}
                            accept=".jpg, .jpeg, .png"
                        ></input>) :
                        (!changePreview ?
                            (<>
                                <img src={previewImage} style={{ borderRadius: "10px" }} />
                                <button onClick={() => {

                                    setChangePreview(true);
                                    setpreviewImage('')
                                }}
                                id="remove-preview-btn"
                                >Change Preview Image</button>
                            </>) :
                            (<input
                                className="file-input"
                                type="file"
                                // value={previewImage}
                                onChange={e => setpreviewImage(e.target.files[0])}
                                accept=".jpg, .jpeg, .png"
                            ></input>))}
                    {submittedWithErrors && errors.previewImage &&
                        <p className="errors">{errors.previewImage}</p>
                    }
                </div>
                {/* NON PREVIEW IMAGES!!!!!!!!!!!! */}
                {
                    <>
                        <div className="input-component">
                            <label>Add Image (Optional)</label>
                            <div id="item-listing-add-image-input-container">
                                <input
                                    className="file-input"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={e => setNewActiveImage(e.target.files[0])}
                                ></input>
                                <button
                                    id="item-listing-add-image-button"
                                    type="button"
                                    onClick={addImage}>Add Image</button>
                            </div>
                            {newActiveImage && errors.newActiveImage &&
                                <p className="errors">{errors.newActiveImage}</p>
                            }
                        </div>
                        {imageArr?.map((image, index) => (
                            <div className="item-listing-add-remove-image-container">
                                <p>{isUpdating ? image.url : image.name}</p>
                                {/* <img src={isUpdating ? image.url : image}
                                className="item-listing-remove-image-image"/> */}
                                <button type="button"
                                    onClick={() => {
                                        if (isUpdating) removeImage(image.id)
                                        else removeImage(index)
                                    }}>
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        ))}
                    </>
                }
                <button
                    type="submit"
                    id="list-form-submit-button">
                    {isUpdating ? "Update Listing" : "Create Listing"}
                </button>
            </form>
        </div>
    )

}
export default ListingForm;
