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

  const lastPreviewImage = useSelector(
    (state) => state.items.currentItem.previewImage
  );
  // NON PREVIEW IMAGES vv
  console.log("Item: ", item);
  const [images, setImages] = useState([]);
  const [newActiveImage, setNewActiveImage] = useState("");
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
    // console.log("Item SETTING : ", item);
    setImages([
      item.previewImage,
      ...item.ItemImages.map((image) => image.url),
    ]);
  }
  console.log("Images: ", images);
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
    if (images.length) {
      for (let i = 0; i < images.length; i++) {
        await dispatch(postNewImageThunk(itemId, images[i]));
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

  // const addImage = async () => {
  //   if (images?.length >= 5)
  //     return alert("Item cannot have more than 5 images");
  //   if (newActiveImage) {
  //     if (isUpdating) {
  //       const image = await dispatch(postNewImageThunk(itemId, newActiveImage));
  //       setImages([...images, image]);

  //       setNewActiveImage("");
  //     } else {
  //       // console.log("Active Image : ", newActiveImage);
  //       setImages([...images, newActiveImage]);
  //       setNewActiveImage("");
  //     }
  //   }
  // };

  // const removeImage = (imageId) => {
  //   if (isUpdating) {
  //     dispatch(deleteImageThunk(imageId));
  //     setImages(images.filter((image) => image.id !== imageId));
  //   } else {
  //     const newImageArr = [];
  //     images.forEach((image, index) => {
  //       if (index !== imageId) newImageArr.push(image);
  //     });
  //     setImages(newImageArr);
  //     // setImageArr(imageArr.filter(image => image.id !== imageId));
  //   }
  // };

  //   console.log("Form Data: ", formData)

  if (isUpdating && !item) {
    return null;
  }
  if (isLoading) return <Loader />;
  if (!user) return <Redirect to="/" />;
  // console.log("Item: ", item);
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
        />
        <SubmitButton
          className={"w-[35%] self-center"}
          buttonText={isUpdating ? "Update Listing" : "Create Listing"}
          type={"submit"}
        />
      </form>
    </div>
  );
};
export default ListingForm;
