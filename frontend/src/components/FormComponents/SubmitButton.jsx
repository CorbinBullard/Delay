import React from "react";

export default function SubmitButton({ className, buttonText, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline border-2 border-sky-500 hover:border-sky-700 ${className}`}
    >
      {buttonText}
    </button>
  );
}
