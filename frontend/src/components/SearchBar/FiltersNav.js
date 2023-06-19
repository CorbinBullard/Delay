import { useEffect, useState } from "react";
import { useFilters } from "../../context/Filters";
import { useDispatch } from "react-redux";
import { fetchAllItemsThunk } from "../../store/item";
import { useModal } from "../../context/Modal";
const FiltersNav = () => {
    const dispatch = useDispatch();
    const {
        name,
        minPrice,
        maxPrice,
        brand,
        condition,
        year,
        setName,
        instrumentType,
        setMinPrice,
        setMaxPrice,
        setBrand,
        setCondition,
        setYear,
        setInstrumentType
    } = useFilters();

    const { closeModal } = useModal();
    const [_minPrice, _setMinPrice] = useState(minPrice);
    const [_maxPrice, _setMaxPrice] = useState(maxPrice);
    const [_brand, _setBrand] = useState(brand);
    const [_condition, _setCondition] = useState(condition);
    const [_year, _setYear] = useState(year);
    const [_instrumentType, _setInstrumentType] = useState(instrumentType)

    useEffect(() => {
        _setMinPrice(minPrice);
        _setMaxPrice(maxPrice);
        _setBrand(brand);
        _setCondition(condition);
        _setYear(year);
        _setInstrumentType(instrumentType)
    }, []);

    useEffect(() => {
        if (_minPrice <= 0) _setMinPrice('');
        if (_maxPrice <= 0) _setMaxPrice('');
        if (_year < 0) _setYear(0);
    }, [_minPrice, _maxPrice, _year])


    const handleSubmit = e => {
        e.preventDefault();
        setValues()
        closeModal()
    }
    const setValues = async () => {
        setMinPrice(_minPrice);
        setMaxPrice(_maxPrice);
        setBrand(_brand);
        setCondition(_condition);
        setYear(_year)
        setInstrumentType(_instrumentType)
    }
    // console.log(
    //     minPrice,
    //     maxPrice,
    //     brand,
    //     condition,
    //     year,
    //     setMinPrice,
    //     setMaxPrice,
    //     setBrand,
    //     setCondition,
    //     setYear)

    const instrumentTypeOptions = [
        { value: "", label: 'Select an Instrument Type' },
        { value: 'guitar', label: 'Guitar' },
        { value: 'bass', label: 'Bass' },
        { value: 'drum', label: 'Drum' },
        { value: 'keyboard', label: 'Keyboard' },
        { value: 'other', label: 'Other' }
    ]

    const conditionOptions = [
        { value: "", label: 'Select a condition' },
        { value: 'new', label: 'New' },
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'poor', label: 'Poor' }
    ]

    return (
        <div>
            <form onSubmit={handleSubmit} id="filters-form">
                <label>Minimum Price</label>
                <input
                    type="number"
                    value={_minPrice}
                    onChange={e => _setMinPrice(e.target.value)}
                />
                <label>Maximum Price</label>
                <input
                    type="number"
                    value={_maxPrice}
                    onChange={e => _setMaxPrice(e.target.value)}
                />
                <label>Instrument Type</label>
                <select
                    type="select"
                    value={_instrumentType}
                    onChange={e => _setInstrumentType(e.target.value)}>
                    {instrumentTypeOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label>Brand</label>
                <input
                    value={_brand}
                    onChange={e => _setBrand(e.target.value)}
                />
                <label>Condition</label>
                <select
                    value={_condition}
                    onChange={e => _setCondition(e.target.value)}>
                    {conditionOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                <label>Year</label>
                <input
                    type="number"
                    value={_year}
                    onChange={e => _setYear(e.target.value)}
                />

                <button>Apply</button>
            </form>
        </div>
    )
}
export default FiltersNav;
