import React from "react";

const InputField = ({
  label,
  type,
  value,
  onChange,
  required,
  error,
  options,
}) => {


  switch (type) {
    case "select": {
      return (
        <div className="w-full">
          <select
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="" disabled>
              {label}
            </option>
            {options &&
              options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          {error && <p className="errors">{error}</p>}
        </div>
      );
    }
    case "textarea": {
      return (
        <div className="w-full">
          <textarea
            className="w-full border-2 border-gray-300 bg-white h-40 px-5 pr-16 pt-2 rounded-lg text-sm focus:outline-none"
            placeholder={label}
            value={value}
            onChange={onChange}
            required={required}
          />
          {error && <p className="errors">{error}</p>}
        </div>
      );
    }
      default: {
        return (
          <div className="w-full">
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
      }
    }
  }





  // return (
  //   <div className="w-full">
  //     {type === "select" ? (
  //       <select
  //         className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
  //         value={value}
  //         onChange={onChange}
  //         required={required}
  //       >
  //         <option value="" disabled>
  //           {label}
  //         </option>
  //         {options &&
  //           options.map((option) => (
  //             <option key={option.value} value={option.value}>
  //               {option.label}
  //             </option>
  //           ))}
  //       </select>
  //     ) : (
  //       <input
  //         className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
  //         placeholder={label}
  //         type={type}
  //         value={value}
  //         onChange={onChange}
  //         required={required}
  //       />
  //     )}
  //     {error && <p className="errors">{error}</p>}
  //   </div>
  // );
// };

export default InputField;
