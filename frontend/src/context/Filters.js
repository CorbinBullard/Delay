import React, { useRef, useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../store/item";

export const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [condition, setCondition] = useState('');
    const [year, setYear] = useState('');
    const [instrumentType, setInstrumentType] = useState('');

    useEffect(() => {
        dispatch(fetchAllItemsThunk(name, minPrice, maxPrice, brand, condition, year, instrumentType))
    }, [minPrice, maxPrice, brand, condition, year, name, instrumentType])
    const values = {
        instrumentType,
        name,
        minPrice,
        maxPrice,
        brand,
        condition,
        year,
        setName,
        setMinPrice,
        setMaxPrice,
        setBrand,
        setCondition,
        setYear,
        setInstrumentType
    }


    return (
        <>
            <FiltersContext.Provider value={values}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}
export const useFilters = () => useContext(FiltersContext);
