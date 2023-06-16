import React, { useRef, useState, useContext } from "react";

const FiltersContext = React.createContext();

export function FiltersProvider({ children }) {
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);
    const [brand, setBrand] = useState(null);
    const [condition, setCondition] = useState(null);
    const [year, setYear] = useState(null);

    values = {
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        brand,
        setBrand,
        condition,
        setCondition,
        year,
        setYear
    }


    return (
        <>
            <FiltersContext.Provider value={values}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}
