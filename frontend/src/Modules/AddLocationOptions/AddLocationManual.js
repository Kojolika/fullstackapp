import React, { useState } from 'react'
import Select from 'react-select'
import { useGetCountriesQuery, useGetStatesQuery, useGetCitiesQuery } from '../../Features/locations/locationApiSlice'

const AddLocationManual = () => {

    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();

    const { data, isSuccess } = useGetCountriesQuery();
    const countries = isSuccess ? data.data : []; //data is the response from the backend, data.data is the list of countries
    const optionsCountries = [];
    countries.forEach(item => {
        optionsCountries.push({
            value: item.country,
            label: item.country
        });
    });

    const { data: dataStates, isSuccess: isSuccessStates } = useGetStatesQuery({ "country": country });
    const states = isSuccessStates ? dataStates.data : [];
    const optionsStates = [];
    states.forEach(item => {
        optionsStates.push({
            value: item.state,
            label: item.state
        });
    });

    const { data: dataCities, isSuccess: isSuccessCities } = useGetCitiesQuery({ "country": country, "state": state });
    const cities = isSuccessCities ? dataCities.data : [];
    const optionsCities = [];
    cities.forEach(item => {
        optionsCities.push({
            value: item.city,
            label: item.city
        });
    });

    const stateSelect = country ?
        <div>
            <span>State/Province</span>
            <br />
            <Select
                options={optionsStates}
                onChange={((newValue) => setState(newValue.value))}
            />
        </div> : <></>;
    const citySelect = state ?
        <div>
            <span>City</span>
            <br />
            <Select
                options={optionsCities}
                onChange={((newValue) => setCity(newValue.value))}
            />
        </div> : <></>;

    return (
        <div>
            <button onClick={() => {
                console.log(country);
                console.log(state);
                console.log(city);
            }}>Check country var</button>

            <br />
            <button>Use my current location</button>
            <br />
            <span>- OR -</span>
            <br />
            <span>Add a location manually</span>
            <br />
            <span> Country </span>
            <Select
                options={optionsCountries}
                onChange={((newValue) => { setCountry(newValue.value) })}
            />
            {stateSelect}
            {citySelect}

        </div>
    )
}

export default AddLocationManual;