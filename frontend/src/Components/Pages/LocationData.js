import { useSelector } from "react-redux"
import { getLocation } from "../../Features/locations/currentLocationSlice"
import { useGetWeatherDataQuery } from "../../Features/locations/locationApiSlice";

import { useEffect } from "react";

import '../../Styles/location.css';

const LocationData = () => {
    const locationBeingDisplayed = useSelector(getLocation);
    const skip = locationBeingDisplayed.city === null ? true : false;

    const { data, isLoading, isSuccess } = useGetWeatherDataQuery(locationBeingDisplayed, { skip })
    
    useEffect(()=>{
        console.log(data);
    },[isSuccess])

    const testLocation = locationBeingDisplayed.city === null ? <span>Null city</span> :
        <span>{locationBeingDisplayed.city}, 
            {locationBeingDisplayed.province}, 
            {locationBeingDisplayed.country}
        </span>
    return (
        <div className="location-data-container">
            {testLocation}
        </div>
    )
}

export default LocationData