// InputField.jsx

import React from "react";

const InputField = ({ label, type, value, onChange, required, error }) => (
  <div className="w-full">
    {/* <label>{label}</label> */}
    <input
      className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      placeholder={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="errors">{error}</p>}
  </div>
);

export default InputField;
