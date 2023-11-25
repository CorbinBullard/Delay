import React, { useState } from "react";

export default function ImageCarousel({ itemImages }) {
  const [imageIndex, setImageIndex] = useState(0);

  const changeImage = (action) => {
    let currIndex = imageIndex;
    currIndex += action;
    if (currIndex > itemImages.length - 1) setImageIndex(0);
    else if (currIndex < 0) setImageIndex(itemImages.length - 1);
    else setImageIndex(currIndex);
  };

  return (
    <div className="h-fit w-fit">
      <img
        className="w-[40rem] h-[40rem] object-cover rounded-xl shadow-lg"
        src={itemImages[imageIndex]}
      />
      {itemImages.length > 1 && (
        <div id="item-image-change-buttons-container" className="mt-3">
          <button
            className="item-image-change-button"
            id="item-image-button-previous"
            onClick={() => changeImage(-1)}
          >
            <i class="fas fa-chevron-right fa-rotate-180"></i>
          </button>
          {itemImages.map((item, index) => (
            <img
              onClick={() => setImageIndex(index)}
              className={`w-28 h-28 object-cover rounded-lg cursor-pointer ${
                imageIndex === index ? "opacity-100" : "opacity-20"
              }`}
              src={itemImages[index]}
            />
          ))}
          <button
            className="item-image-change-button"
            id="item-image-button-next"
            onClick={() => changeImage(1)}
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
