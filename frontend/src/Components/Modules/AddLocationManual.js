import { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCurrentUser } from '../../Features/auth/authSlice'
import { useAddUserLocationMutation } from '../../Features/auth/authApiSlice'

import SelectCountry from '../Atoms/SelectCountry'
import SelectState from '../../Components/Atoms/SelectState'
import SelectCity from '../../Components/Atoms/SelectCity'

import '../../Styles/addLocation.css';
import '../../Styles/app.css';



const AddLocationManual = (props) => {

    const user = useSelector(selectCurrentUser);
    const [country, setCountry] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleCountryChange = country =>{
        setCountry(country);
        setState();
        setCity();
    }
    const handleStateChange = state => {
        setState(state);
        setCity();
    };
    
    const countrySelect = <SelectCountry setCountry={handleCountryChange} setErrorMessage={setErrorMessage}/>
    const stateSelect = country ? <SelectState country={country} setState={handleStateChange} /> : <></>;
    const citySelect = state ? <SelectCity country={country} state={state} setCity={setCity} /> : <></>;

    const [addLocation, { isLoading }] = useAddUserLocationMutation();
    const addToDatabase = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                const locationResponse = await addLocation(
                    { 'username': user, 'country': country, 'province': state, 'city': city }
                ).unwrap();
                console.log(locationResponse);
                setCity();
                setState();
                setCountry();
                props.reloadData();
            }
            catch (err) {
                console.log(err?.status);
                console.log("Error with backend call");
                setErrorMessage(err);
            }
        }
        props.toggleMoodleClose();
    }
    const submitButton = country ? state ? city ? <button id="manualSubmit" >Submit</button> : <></> : <></> : <></>;
    const errMsg = errorMessage === '' ? <></> : <span className='errmsg'>{errorMessage}</span>;

    return (
        <form className='addLocationManualContent' onSubmit={addToDatabase}>
            {errMsg}
            <br />
            {countrySelect}
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