import { useEffect, useState } from "react";
import { useFilters } from "../../context/Filters";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import { useModal } from "../../context/Modal";
import InputField from "../FormComponents/InputField";
import SubmitButton from "../FormComponents/SubmitButton";
const FiltersNav = () => {
  const dispatch = useDispatch();
  const { setFilters, filters } = useFilters();
  const [formData, setFormData] = useState({
    name: filters.name,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    brand: filters.brand,
    condition: filters.condition,
    year:  filters.year,
    instrumentType: filters.instrumentType,
  });
//   console.log(filters);

  const { closeModal } = useModal();
  // console.log("FORM DA/TA : ", filterData);

  const filterTypes = {
    name: "text",
    minPrice: "number",
    maxPrice: "number",
    brand: "text",
    condition: "select",
    year: "number",
    instrumentType: "select",
  };

  useEffect(() => {}, []);

  //   useEffect(() => {
  //     if (_minPrice <= 0) _setMinPrice("");
  //     if (_maxPrice <= 0) _setMaxPrice("");
  //     if (_year < 0) _setYear(0);
  //   }, [_minPrice, _maxPrice, _year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("FORM DATA : ", formData);
    setFilters({...formData});
    setValues();
    closeModal();
  };
  const setValues = async () => {};

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
//   console.log("FILTERS : ", filters);
  return (
    <div>
      <form onSubmit={handleSubmit} id="filters-form">
        {Object.keys(filters).map((key) => (
          <InputField
            type={filterTypes[key]}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            options={
              filterTypes[key] !== "select"
                ? null
                : key === "instrumentType"
                ? instrumentTypeOptions
                : conditionOptions
            }
          />
        ))}
        <SubmitButton buttonText={"Apply Filters"} type={"submit"} />
      </form>
    </div>
  );
};
export default FiltersNav;
