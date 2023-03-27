import Select from 'react-select'
import { useEffect } from 'react'
import { useGetCitiesQuery } from '../../Features/locations/locationApiSlice'

import './../../Styles/addLocation.css'


const SelectCity = (props) => {

    const { data: cityList , currentData: currentCityList, isLoading, isSuccess, refetch } = useGetCitiesQuery({ "country": props.country, "state": props.state });
    const cities = isSuccess ? currentCityList ? currentCityList : cityList : [];
    const optionsCities = [];
    cities.forEach(item => {
        optionsCities.push({
            value: item.city,
            label: item.city
        });
    });

    const noOptionsMessage = "Note: If no options for cities, then there are no active stations reporting weather data in that state.";
    const placeholderMessage = 'Select a city';
    const loadingMessage = 'Loading cities...'

    useEffect(() =>{
        refetch();
    },[props.country, props.state])

    return (
        <div>
            <label htmlFor='city'>City</label>
            <br />
            <Select
                id="city"
                placeholder={placeholderMessage}
                isLoading={isLoading ? true : false}
                loadingMessage={() => loadingMessage}
                options={optionsCities}
                onChange={(newValue) => props.setCity(newValue.value)}
            />
            <span className='note'>{noOptionsMessage}</span>
        </div>
    )
}

export default SelectCity