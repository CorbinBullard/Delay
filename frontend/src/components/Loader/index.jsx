import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center">
      <AiOutlineLoading3Quarters className="text-9xl self-center absolute top-[45%] h-fit text-sky-600 animate-spin" />
    </div>
  );
}
