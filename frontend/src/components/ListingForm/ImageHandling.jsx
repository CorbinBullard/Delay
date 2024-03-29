import React, { useRef, useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { CiSquareRemove } from "react-icons/ci";

const AddImage = ({ addImages }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log("ADDED FILEs: ", event.target.files);
    const input = event.target;
    addImages(input.files);
  };

  return (
    <div className="custom-file-input-container">
      <input
        type="file"
        ref={fileInputRef}
        className="custom-file-input"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="w-40 h-40 border-dashed border-2 border-gray-400 rounded-xl text-gray-400 m-auto hover:text-sky-600 hover:border-sky-600"
      >
        <div className="flex justify-center gap-2">
          <IoAdd className="text-5xl" />
          <FaRegImages className="text-5xl" />
        </div>
      </button>
    </div>
  );
};

const Image = ({ url, index, removeImage }) => {
//   console.log("URL: ", url);
  return (
    <div
      className={`w-40 h-40 rounded-xl relative cursor-pointer ${
        index === 0 ? "border-sky-500 border-4 bg-sky-500 rounded-lg" : ""
      }`}
      onClick={() => removeImage(index)}
    >
      <CiSquareRemove className="text-red-900 absolute w-full h-full opacity-0 hover:opacity-40 z-10" />
      <img
        src={url}
        className="absolute w-full h-full object-cover rounded-xl"
        alt="user uploaded item"
      />
    </div>
  );
};

export default function ImageHandling({
  className,
  images,
  setImages,
  deletedImageIds
}) {
  const [imageURLArray, setImageURLArray] = useState([...images.map(image => typeof image === 'string' ? image : image.url)])

  // console.log(imageURLArray);
  function addImages(files) {
    const imageFiles = Object.values(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImages([...images, ...Object.values(files)]);
    setImageURLArray([...imageURLArray, ...imageFiles]);
  }

  function removeImage(index) {
    const newImages = [...images];
    newImages.splice(index, 1);
    imageURLArray.splice(index, 1);
    if (images[index].id) deletedImageIds.current.push(images[index].id);
    setImages(newImages);
  }

  return (
    <div className={`flex gap-4 ${className}`}>
      {imageURLArray.map((key, index) => (
        <Image key={index} url={key} removeImage={removeImage} index={index} />
      ))}
      {images.length < 4 && <AddImage addImages={addImages} />}
    </div>
  );
}
