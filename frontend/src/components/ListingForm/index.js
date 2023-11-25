import "./ListingForm.css";
import { Redirect } from "react-router-dom";
import { useEffect, useRef } from "react";
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
import SubmitButton from "../FormComponents/SubmitButton";
import ImageHandling from "./ImageHandling";
import Loader from "../Loader";

const ListingForm = ({ isUpdating }) => {
  const params = useParams();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const item = useSelector((state) => state.items.currentItem);
  const itemId = item?.id;
  const [isLoading, setIsLoading] = useState(false);
  const deletedImageIds = useRef([]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    instrumentType: "",
    year: "",
    condition: "",
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

  // NON PREVIEW IMAGES vv
  // console.log("Item: ", item);
  const [images, setImages] = useState([]);

  // NON PREVIEW IMAGES ^^

  const [errors, setErrors] = useState({});
  const [submittedWithErrors, setSubmittedWithErrors] = useState(false);

  const currentYear = new Date().getFullYear();

  // This will repopulate fields on refresh
  useEffect(() => {
    if (isUpdating) {
      setIsLoading(true);
      fetchAndSet().then(() => setIsLoading(false));
    }
  }, [dispatch, isUpdating, user]);

  async function fetchAndSet() {
    const item = await dispatch(fetchSingleItemThunk(params.itemId));
    setFormData({
      ...formData,
      name: item.name,
      brand: item.brand,
      price: item.price,
      description: item.description,
      instrumentType: item.instrumentType,
      year: item.year,
      condition: item.condition,
    });

    setImages([item.previewImage, ...item.ItemImages.map((image) => image)]);
  }
  // console.log("Images: ", images);
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
    if (!images.length)
      errorsObj.previewImage = "A preview Image of your Item is required";

    setErrors(errorsObj);
  }, [formData, images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).length) {
      // console.log("Errors: ", errors, images);
      setSubmittedWithErrors(true);
      return;
    }
    const newItem = {
      ...formData,
    };
    console.log("Images PREVIEW: ", images[0], item.previewImage)
    if (images[0] !== item.previewImage) {
      console.log("Images: ", images);
      newItem.previewImage = images[0];
    }
    console.log("New Item: ", newItem)
    if (!isUpdating) {
      const item = await dispatch(postNewItemThunk(newItem));
      postImages(item.id);
      return history.push(`/items/${item.id}`);
    } else {
      await dispatch(updateNewItemThunk(itemId, newItem));
      await deleteImages(deletedImageIds.current);
      await postImages(itemId);
      return history.push(`/items/${itemId}`);
    }
  };
  console.log("Images: ", images);
  async function postImages(itemId) {
    // Change this to upload first image as preview image
    if (images.length) {
      for (let i = 1; i < images.length; i++) {
        const image = images[i];
        console.log("Image: ", image.name)
        if (!image.name) continue;
        await dispatch(postNewImageThunk(itemId, image));
      }
    }
  }
  async function deleteImages(imageIdArr) {
    for (let i = 0; i < imageIdArr.length; i++) {
      await dispatch(deleteImageThunk(imageIdArr[i]));
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

  if (isUpdating && !item) {
    return null;
  }
  if (isLoading) return <Loader />;
  if (!user) return <Redirect to="/" />;

  return (
    <div className="flex flex-col gap-3 align-middle justify-center">
      <Title
        title={isUpdating ? "Update Listing" : "Tell us about your instrument"}
      />
      <form
        className="flex flex-col gap-3 align-middle justify-center"
        onSubmit={handleSubmit}
      >
        <div className="w-[35%] self-center flex flex-col gap-3">
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
        </div>
        <ImageHandling
          className="self-center"
          itemImages={images}
          isUpdating={isUpdating}
          images={images}
          setImages={setImages}
          deletedImageIds={deletedImageIds}
        />
        {submittedWithErrors && errors.previewImage && (
          <p className="text-red-500 text-sm italic self-center">
            {errors.previewImage}
          </p>
        )}
        <SubmitButton
          className="w-[35%] self-center"
          buttonText={isUpdating ? "Update Listing" : "Create Listing"}
          type={"submit"}
        />
      </form>
    </div>
  );
};
export default ListingForm;
