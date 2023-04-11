import { useSelector } from "react-redux"
import { useState } from "react";

import { selectCurrentLocation } from "../../Features/locations/locationsSlice"
import { useGetCityWeatherDataQuery } from "../../Features/locations/airVisualApiSlice";
import { useGetLocationKeyQuery } from "../../Features/locations/accuWeatherApiSlice";

import '../../Styles/location.css';
import '../../Styles/app.css';

import { StarBorder, StarFilled } from "../../Icons/svgImages/index.js";
import { selectCurrentUser } from "../../Features/auth/authSlice";

const LocationData = () => {
    const [isFavorited, setIsFavorited] = useState(false);

    const user = useSelector(selectCurrentUser);

    const locationBeingDisplayed = useSelector(selectCurrentLocation);

    //this is for Air Visual API, for some reason you need to query it as 'USA' not 'United States'
    const locationBeingDisplayAirVisualCall = locationBeingDisplayed?.country?.name === 'United States' ? 
    {
        "city" : locationBeingDisplayed.city,
        "province": locationBeingDisplayed.province,
        "country" : {
            "name" : "USA",
            "iso2" : locationBeingDisplayed.country.iso2
        }
    } :locationBeingDisplayed;
    
    const skip = locationBeingDisplayed.city === null ? true : false;

    const { currentData: currentDataAirVisual,
        isLoading: isLoadingAirVisual,
        isSuccess: isSuccessAirVisual,
        error: errorAirVisual,
        isError: isErrorAirVisual,
        isFetching: isFetchingAirVisual } = useGetCityWeatherDataQuery(locationBeingDisplayAirVisualCall, { skip })

    const { currentData: locationKey } = useGetLocationKeyQuery(locationBeingDisplayed, { skip });
    console.log(locationKey)
    const locationName = locationBeingDisplayed.city === null ? <></> : <div id='location-name'>

        {locationBeingDisplayed.city.name}, {locationBeingDisplayed.province.name}, {locationBeingDisplayed.country.name}
    </div>

    const dateFormatted = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.ts.slice(5, 10) : <></>
    const timeFormatted = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.ts.slice(11, 16) : <></>

    const toggleFavorite = () => {
        if (isFavorited) setIsFavorited(false);
        else setIsFavorited(true);
    }

    const locationData = <article id="location-data-display" className="border" >
        <div id={user ? 'favorites-button' : 'favorites-button-disabled'} className='optionsButtons' onClick={user ? () => toggleFavorite() : null}>
            {isFavorited ? <StarFilled /> : <StarBorder />}
        </div>
        {locationName}
        <div id="location-data" >
            <div id='weather' className="border">
                <div id='temperature'>{currentDataAirVisual?.data?.current?.weather?.tp}°C</div>
                <div id='other-weather-data'>
                    <span className="other-weather-data-entry" id="humidity">{currentDataAirVisual?.data?.current?.weather?.hu}%</span>
                    <span className="other-weather-data-entry" id="wind-speed">{currentDataAirVisual?.data?.current?.weather?.ws} m/s</span>
                    <span className="other-weather-data-entry" id='wind-direction'>{currentDataAirVisual?.data?.current?.weather?.wd}°</span>
                    <span className="other-weather-data-entry" id='atmospheric-pressure'>{currentDataAirVisual?.data?.current?.weather?.pr} hPa</span>
                </div>
            </div>
            <div id='pollution' className="border">
                <div id='AQI'>{currentDataAirVisual?.data?.current?.pollution?.aqius}</div>
                <span id='AQI-label'>Air Quality</span>
            </div>

        </div>
        <div>
            <span>Last updated </span>
            {dateFormatted}, {timeFormatted}
        </div>
    </article>

    const err = isErrorAirVisual ? <span>{errorAirVisual?.data?.message}</span> : <></>
    const location = isSuccessAirVisual ? locationData : <></>;


    return (
        <div className="location-data-container">
            {isErrorAirVisual ? err : isLoadingAirVisual || isFetchingAirVisual ? <span>Loading...</span> : location}
        </div>
    )
}

export default LocationData