import "./ListingForm.css";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageThunk,
  postNewImageThunk,
  postNewItemThunk,
  updateNewItemThunk,
} from "../../store/item";
import { useHistory, useParams } from "react-router";
import { fetchSingleItemThunk } from "../../store/item";
import InputField from "../FormComponents/InputField";
import Title from "../FormComponents/Title";

const ListingForm = ({ isUpdating }) => {
  const params = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const item = useSelector((state) => state.items.currentItem);
  const itemId = item?.id;
  const [changePreview, setChangePreview] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    instrumentType: "",
    year: "",
    condition: "",
    // previewImage: "",
  });

  const formDataTypes = {
    name: "text",
    brand: "text",
    price: "text",
    description: "textarea",
    instrumentType: "select",
    year: "text",
    condition: "select",
    // previewImage: "file",
  };

  const lastPreviewImage = useSelector(
    (state) => state.items.currentItem.previewImage
  );
  // NON PREVIEW IMAGES vv
  const [imageArr, setImageArr] = useState(isUpdating ? item.ItemImages : []);
  const [newActiveImage, setNewActiveImage] = useState("");
  // NON PREVIEW IMAGES ^^

  const [errors, setErrors] = useState({});
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false);

  const currentYear = new Date().getFullYear();

  // This will repopulate fields on refresh
  useEffect(() => {
    if (isUpdating) fetchAndSet();
  }, [dispatch, user]);

  async function fetchAndSet() {
    const item = await dispatch(fetchSingleItemThunk(params.itemId));
    console.log(item);
    formData.setName(item.name);
    formData.setBrand(item.brand);
    formData.setPrice(item.price);
    formData.setDescription(item.description);
    formData.setInstrumentType(item.instrumentType);
    formData.setYear(item.year);
    formData.setCondition(item.condition);
    formData.setpreviewImage(item.previewImage);
    formData.setImageArr(item.ItemImages);
  }

  useEffect(() => {
    const errorsObj = {};
    if (!formData.name) errorsObj.name = "Item name is required";
    if (!formData.condition)
      errorsObj.condition = "Select a condition for your Item";
    if (!formData.instrumentType)
      errorsObj.instrumentType = "Select a type for your Item";
    if (!formData.brand) errorsObj.brand = "Item brand is required";
    if (!formData.price) errorsObj.price = "Price is required";
    if (formData.price && isNaN(+formData.price))
      errorsObj.price = "Price must be a number";
    if (formData.price && !isNaN(+formData.price) && formData.price < 0)
      errorsObj.price = "Price cannot be negative";
    if (!formData.description)
      errorsObj.description = "Item description is required";
    if (formData.description && formData.description.length < 10)
      errorsObj.description = "Item description must be at least 10 Characters";
    if (!formData.year) errorsObj.year = "Item Year is required";
    if (formData.year && formData.year > currentYear)
      errorsObj.year = "Year cannot be greater than current year";
    if (formData.year && isNaN(+formData.year))
      errorsObj.year = "Year must be a number";
    if (!formData.previewImage)
      errorsObj.previewImage = "A preview Image of your Item is required";
    // if (previewImage && !isValidUrl(previewImage)) errorsObj.previewImage = "Image URL must end in .png, .jpg or .jpeg";

    // NON PREVIEW IMAGES
    // if (newActiveImage && !isValidUrl(newActiveImage)) errorsObj.newActiveImage = "Image URL must end in .png, .jpg or .jpeg";

    setErrors(errorsObj);
  }, [formData]);

  const isValidUrl = (url) => {
    const imageFormatTypes = ["jpg", "jpeg", "png"];
    const urlArr = url.split(".");
    if (imageFormatTypes.includes(urlArr[urlArr.length - 1])) return true;
    else {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).length) {
      setSubmittedWithErrors(true);
      return;
    }
    const newItem = {
      ...formData, // This will be the first image uploaded
    };
    if (!isUpdating) {
      const item = await dispatch(postNewItemThunk(newItem));
      postImages(item.id);
      return history.push(`/items/${item.id}`);
    } else {
      const item = await dispatch(updateNewItemThunk(itemId, newItem));
      return history.push(`/items/${itemId}`);
    }
  };

  async function postImages(itemId) {
    // Change this to upload first image as preview image
    if (imageArr.length) {
      for (let i = 0; i < imageArr.length; i++) {
        await dispatch(postNewImageThunk(itemId, imageArr[i]));
      }
    }
  }

  const instrumentTypeOptions = [
    { value: "", label: "Select an Instrument Type" },
    { value: "guitar", label: "Guitar" },
    { value: "bass", label: "Bass" },
    { value: "drum", label: "Drum" },
    { value: "keyboard", label: "Keyboard" },
    { value: "other", label: "Other" },
  ];

  const conditionOptions = [
    { value: "", label: "Select a condition" },
    { value: "new", label: "New" },
    { value: "excellent", label: "Excellent" },
    { value: "good", label: "Good" },
    { value: "poor", label: "Poor" },
  ];
  // NON PREVIEW IMAGES

  const addImage = async () => {
    if (imageArr?.length >= 5)
      return alert("Item cannot have more than 5 images");
    if (newActiveImage) {
      if (isUpdating) {
        const image = await dispatch(postNewImageThunk(itemId, newActiveImage));
        setImageArr([...imageArr, image]);

        setNewActiveImage("");
      } else {
        console.log("Active Image : ", newActiveImage);
        setImageArr([...imageArr, newActiveImage]);
        setNewActiveImage("");
      }
    }
  };

  const removeImage = (imageId) => {
    if (isUpdating) {
      dispatch(deleteImageThunk(imageId));
      setImageArr(imageArr.filter((image) => image.id !== imageId));
    } else {
      const newImageArr = [];
      imageArr.forEach((image, index) => {
        if (index !== imageId) newImageArr.push(image);
      });
      setImageArr(newImageArr);
      // setImageArr(imageArr.filter(image => image.id !== imageId));
    }
  };

  console.log("Form Data: ", formData)

  if (isUpdating && !item) {
    return null;
  }
  if (!user) return <Redirect to="/" />;

  return (
    <div id="listing-form-page-container" className="flex flex-col gap-3">
      <Title title={isUpdating ? "Update Listing" : "Tell us about your instrument"} />
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <InputField
            type={formDataTypes[key]}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData[key]}
            onChange={(e) =>
              setFormData({ ...formData, [key]: e.target.value })
            }
            required
            error={submittedWithErrors && errors[key]}
            options={
              formDataTypes[key] !== "select"
                ? null
                : key === "instrumentType"
                ? instrumentTypeOptions
                : conditionOptions
            }
          />
        ))}
        <div className="input-component">
          <label>Preview Image</label>
          {!isUpdating ? (
            <input
              className="file-input"
              type="file"
              // value={previewImage}
              onChange={(e) =>
                setFormData({ ...formData, previewImage: e.target.files[0] })
              }
              accept=".jpg, .jpeg, .png"
            ></input>
          ) : !changePreview ? (
            <>
              <img
                src={formData.previewImage}
                style={{ borderRadius: "10px" }}
              />
              <button
                onClick={() => {
                  setChangePreview(true);
                  setFormData({ ...formData, previewImage: "" });
                }}
                id="remove-preview-btn"
              >
                Change Preview Image
              </button>
            </>
          ) : (
            <input
              className="file-input"
              type="file"
              // value={previewImage}
              onChange={(e) =>
                setFormData({ ...formData, previewImage: e.target.files[0] })
              }
              accept=".jpg, .jpeg, .png"
            ></input>
          )}
          {submittedWithErrors && errors.previewImage && (
            <p className="errors">{errors.previewImage}</p>
          )}
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
                  onChange={(e) => setNewActiveImage(e.target.files[0])}
                ></input>
                <button
                  id="item-listing-add-image-button"
                  type="button"
                  onClick={addImage}
                >
                  Add Image
                </button>
              </div>
              {newActiveImage && errors.newActiveImage && (
                <p className="errors">{errors.newActiveImage}</p>
              )}
            </div>
            {imageArr?.map((image, index) => (
              <div className="item-listing-add-remove-image-container">
                <p>{isUpdating ? image.url : image.name}</p>
                {/* <img src={isUpdating ? image.url : image}
                                className="item-listing-remove-image-image"/> */}
                <button
                  type="button"
                  onClick={() => {
                    if (isUpdating) removeImage(image.id);
                    else removeImage(index);
                  }}
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            ))}
          </>
        }
        <button type="submit" id="list-form-submit-button">
          {isUpdating ? "Update Listing" : "Create Listing"}
        </button>
      </form>
    </div>
  );
};
export default ListingForm;
