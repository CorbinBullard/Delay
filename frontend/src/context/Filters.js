import React, { useRef, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../store/item";

export const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    name: "",
    minPrice: "",
    maxPrice: "",
    brand: "",
    condition: "",
    year: "",
    instrumentType: "",
  });

  useEffect(() => {
    dispatch(fetchAllItemsThunk(filters));
  }, [filters]);

  function resetFilters() {
    setFilters({
      name: "",
      minPrice: "",
      maxPrice: "",
      brand: "",
      condition: "",
      year: "",
      instrumentType: "",
    });
  }
  const values = {
    setFilters,
    resetFilters,
    filters,
  };

  return (
    <>
      <FiltersContext.Provider value={values}>
        {children}
      </FiltersContext.Provider>
    </>
  );
}

export const useFilters = () => useContext(FiltersContext);
