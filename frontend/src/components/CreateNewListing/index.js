import { useState } from "react";


const CreateNewListing = ({ item }) => {

    const [name, setName] = useState(item ? item.name : "")
    const [brand, setBrand] = useState(item ? item.brand : "")
    const [price, setPrice] = useState(item ? item.price : "")
    const [description, setDescription] = useState(item ? item.description : "")
    const [instrumentType, setInstrumentType] = useState(item ? item.instrumentType : "")
    const [year, setYear] = useState(item ? item.year : "")
    const [condition, setCondition] = useState(item ? item.condition : "")
    const [previewImage, setpreviewImage] = useState(item ? item.previewImage : "")

    const instrumentTypeOptions = [
        { value: 'guitar', label: 'Guitar' },
        { value: 'bass', label: 'Bass' },
        { value: 'drum', label: 'Drum' },
        { value: 'keyboard', label: 'Keyboard' },
        { value: 'other', label: 'Other' }
    ]
    const conditionOptions = [
        { value: 'new', label: 'New' },
        { value: 'excellent', label: 'Excellent' },
        { value: 'good', label: 'Good' },
        { value: 'poor', label: 'Poor' }
    ]


    return (
        <>
            <h2>Tell us about your Instrument</h2>
            <form>
                <div className="input Component">
                    <label>Name and Model</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    ></input>
                </div>
                <div className="input Component">
                    <label>Brand</label>
                    <input
                        type="text"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    ></input>
                </div>
                <div className="input Component">
                    <label>Price</label>
                    <input
                        type="text"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    ></input>
                </div>
                <div className="input Component">
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></input>
                </div>
                <div className="input Component">
                    <label>Instrument Type</label>
                    <select
                        value={instrumentType}
                        onChange={e => setInstrumentType(e.target.value)}>
                        {instrumentTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="input Component">
                    <label>Year</label>
                    <input
                        type="text"
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    ></input>
                </div>
                <div className="input Component">
                    <label>Condition</label>
                    <select
                        value={condition}
                        onChange={e => setCondition(e.target.value)}>
                        {instrumentTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </form>
        </>
    )



}
export default CreateNewListing;
