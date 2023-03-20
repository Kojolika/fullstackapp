import { useState } from 'react'
import Select from 'react-select'

import { useGetCountriesQuery} from '../../Features/locations/locationApiSlice'

import SelectState from '../../Atoms/SelectState'
import SelectCity from '../../Atoms/SelectCity'


const AddLocationManual = (props) => {

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

    const handleStateChange = (state) => setState(state);
    const stateSelect = country ? <SelectState country={country} setState={handleStateChange} /> : <></>;

    const handleCityChange = (city) => setCity(city);
    const citySelect = state ? <SelectCity country={country} state={state} setCity={handleCityChange}/> : <></>;

    return (
        <div>
            <button onClick={() => {
                console.log(country);
                console.log(state);
                console.log(city);
            }}>Check country var</button>

            <br />
            <span> Country </span>
            <Select
                options={optionsCountries}
                onChange={((newValue) => { setCountry(newValue.value) })}
            />
            {stateSelect}
            {citySelect}
            <button onClick={() => props.toggleClose()}>Close</button>
        </div>
    )
}

export default AddLocationManual;