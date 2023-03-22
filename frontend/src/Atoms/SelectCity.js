import Select from 'react-select'
import { useEffect } from 'react'
import { useGetCitiesQuery } from '../Features/locations/locationApiSlice'

import './../Styles/addLocation.css'


const SelectCity = (props) => {

    const noOptionsSring = "Note: If no options for cities, then there are no active stations reporting weather data in that state.";
    const { data, currentData, isSuccess, refetch } = useGetCitiesQuery({ "country": props.country, "state": props.state });
    const cities = isSuccess ? currentData ? currentData.data : data.data : [];
    const optionsCities = [];
    cities.forEach(item => {
        optionsCities.push({
            value: item.city,
            label: item.city
        });
    });

    useEffect(() =>{
        refetch();
    },[props.country,props.state])


    return (
        <div>
            <label htmlFor='city'>City</label>
            <br />
            <Select
                id="city"
                options={optionsCities}
                onChange={(newValue) => props.setCity(newValue.value)}
            />
            <span className='note'>Note: If no options for cities, then there are no active stations reporting weather data in that state.</span>
        </div>
    )
}

export default SelectCity