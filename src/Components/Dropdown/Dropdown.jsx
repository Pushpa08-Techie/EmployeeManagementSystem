
import React, { useState } from 'react';

 
function Dropdown() {

    const [value, setValue] = useState('');

    const options = [

        { label: "New", value: "new" },

        { label: "Update", value: "update" },

        { label: "Delete", value: "delete" },

    ];
 
    function handleSelect(event) {

        const selectedValue = event.target.value;

        setValue(selectedValue);
 
        // Handle actions based on selection

        switch (selectedValue) {

            case "new":

                console.log("Create a new item");
                navigate("/new");

                break;

            case "update":

                console.log("Update an existing item");

                break;

            case "delete":

                console.log("Delete an item");

                break;

            default:

                break;

        }

    }
 
    return (

        <div className='dropdown-container'>

            <select className='form-select' onChange={handleSelect} value={value}>

                <option value="" disabled>Actions</option>

                {options.map(option => (

                    <option key={option.value} value={option.value}>

                        {option.label}

                    </option>

                ))}

            </select>

        </div>

    );

}
 
export default Dropdown;

 