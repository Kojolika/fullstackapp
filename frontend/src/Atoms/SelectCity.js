import Select from 'react-select'
import React from 'react'
import { useGetCitiesQuery } from '../Features/locations/locationApiSlice'

import './../Styles/addLocation.css'


const SelectCity = (props) => {

    const noOptionsSring = "Note: If no options for cities, then there are no active stations reporting weather data in that state.";
    const { data, currentData, isSuccess } = useGetCitiesQuery({ "country": props.country, "state": props.state });
    const cities = isSuccess ? currentData ? currentData.data : data.data : [];
    const optionsCities = [];
    cities.forEach(item => {
        optionsCities.push({
            value: item.city,
            label: item.city
        });
    });
    return (
        <div>
            <span>City</span>
            <br />
            <Select
                options={optionsCities}
                onChange={(newValue) => props.setCity(newValue.value)}
            />
            <span className='note'>Note: If no options for cities, then there are no active stations reporting weather data in that state.</span>
        </div>
    )
}

export default SelectCity