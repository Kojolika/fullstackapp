import React, { useEffect } from 'react'
import { useGetCountriesQuery } from '../../Features/locations/locationApiSlice';
import Select from 'react-select'

const SelectCountry = (props) => {

    const { data: countriesList, currentData: currentCountriesList, isLoading, isSuccess, isError, error } = useGetCountriesQuery();
    const countries = isSuccess ? currentCountriesList ? currentCountriesList.data : countriesList.data : [];
    const optionsCountries = [];
    countries.forEach(item => {
        optionsCountries.push({
            value: item.country,
            label: item.country
        });
    });

    const placeholderMessage = 'Select a country';
    const loadingMessage = 'Loading Countries...';

    useEffect(()=>{
        if (isError) props.setErrorMessage('No server response');
        else props.setErrorMessage('');
    },[isError])

    return (
        <div>
            <label htmlFor='country'>Country</label>
            <Select
                id="country"
                placeholder={placeholderMessage}
                options={optionsCountries}
                loadingMessage={() => loadingMessage}
                isLoading={isLoading ? true : false}
                autoFocus={true}
                onChange={newValue => {props.setCountry(newValue.value);}}
            />
        </div>
    )
}

export default SelectCountry