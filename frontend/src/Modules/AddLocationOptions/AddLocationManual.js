import { useState } from 'react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { useGetCountriesQuery } from '../../Features/locations/locationApiSlice'
import { selectCurrentUser } from '../../Features/auth/authSlice'
import { useAddUserLocationMutation } from '../../Features/auth/authApiSlice'

import SelectState from '../../Atoms/SelectState'
import SelectCity from '../../Atoms/SelectCity'

import './../../Styles/addLocation.css';


const AddLocationManual = (props) => {

    const user = useSelector(selectCurrentUser);
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();

    useEffect(() => {
        setCity();
        setState();
        setCountry();
    },[])

    const { data, currentData, isSuccess } = useGetCountriesQuery();

    const countries = isSuccess ? currentData ? currentData.data : data.data : []; //data is the response from the backend, data.data is the list of countries
    const optionsCountries = [];
    countries.forEach(item => {
        optionsCountries.push({
            value: item.country,
            label: item.country
        });
    });

    const handleStateChange = (state) => {
        setState(state);
        setCity();
    };
    const stateSelect = country ? <SelectState country={country} setState={handleStateChange} /> : <></>;

    const handleCityChange = (city) => setCity(city);
    const citySelect = state ? <SelectCity country={country} state={state} setCity={handleCityChange} /> : <></>;

    const [addLocation, {isLoading}] = useAddUserLocationMutation();
    const addToDatabase = async (e) => {
        e.preventDefault();
        if(user){
            try{
                const locationResponse = await addLocation({ 'username': user,'country': country, 'province': state, 'city': city }).unwrap();
                console.log(locationResponse);
                setCity();
                setState();
                setCountry();
            }
            catch(err){
                console.log(err?.status);
                console.log("Error with backend call");
            }
        }
        props.toggleMoodleClose();
    }
    const submitButton = country ? state ? city ? <button id="manualSubmit" >Submit</button> : <></> : <></> : <></>;

    return (
        <form className='addLocationManualContent' onSubmit={addToDatabase}>
            <br />
            <label htmlFor='country'> Country </label>
            <Select
                id="country"
                options={optionsCountries}
                onChange={((newValue) => { 
                    setCountry(newValue.value);
                    setState();
                    setCity(); 
                })}
            />
            {stateSelect}
            {citySelect}
            <div id="manualButtons">
                {submitButton}
            </div>
            <button id="manualClose" onClick={() => props.toggleClose()}>Close</button>
        </form>
    )
}

export default AddLocationManual;