import { useSelector } from "react-redux"
import { useState } from "react";

import { selectCurrentLocation as selectCurrentLocation } from "../../Features/locations/currentLocationSlice"
import { useGetCityWeatherDataQuery } from "../../Features/locations/airVisualApiSlice";

import '../../Styles/location.css';
import '../../Styles/app.css';

import { Favorite, HeartPlus } from "../../Icons/svgImages/index.js";
import { selectCurrentUser } from "../../Features/auth/authSlice";

const LocationData = () => {
    const [isFavorited, setIsFavorited] = useState(false);

    const user = useSelector(selectCurrentUser);

    const locationBeingDisplayed = useSelector(selectCurrentLocation);
    const skip = locationBeingDisplayed.city === null ? true : false;

    const { currentData, isLoading, isSuccess, error, isError, isFetching } = useGetCityWeatherDataQuery(locationBeingDisplayed, { skip })

    const locationName = locationBeingDisplayed.city === null ? <></> : <div id='location-name'>

        {locationBeingDisplayed.city.name}, {locationBeingDisplayed.province.name}, {locationBeingDisplayed.country.name}
    </div>

    const dateFormatted = isSuccess ? currentData?.data?.current?.weather?.ts.slice(5, 10) : <></>
    const timeFormatted = isSuccess ? currentData?.data?.current?.weather?.ts.slice(11, 16) : <></>

    const toggleFavorite = () => {
        if (isFavorited) setIsFavorited(false);
        else setIsFavorited(true);
    }

    const locationData = <article id="location-data-display" className="border" >
        <div id={user? 'favorites-button' : 'favorites-button-disabled'} className='optionsButtons'  onClick={ user ? () => toggleFavorite() : null}>
            {isFavorited? <Favorite/> : <HeartPlus/>}
        </div>
        {locationName}
        <div id="location-data" >
            <div id='weather' className="border">
                <div id='temperature'>{currentData?.data?.current?.weather?.tp}°C</div>
                <div id='other-weather-data'>
                    <span className="other-weather-data-entry" id="humidity">{currentData?.data?.current?.weather?.hu}%</span>
                    <span className="other-weather-data-entry" id="wind-speed">{currentData?.data?.current?.weather?.ws} m/s</span>
                    <span className="other-weather-data-entry" id='wind-direction'>{currentData?.data?.current?.weather?.wd}°</span>
                    <span className="other-weather-data-entry" id='atmospheric-pressure'>{currentData?.data?.current?.weather?.pr} hPa</span>
                </div>
            </div>
            <div id='pollution' className="border">
                <div id='AQI'>{currentData?.data?.current?.pollution?.aqius}</div>
                <span id='AQI-label'>Air Quality</span>
            </div>

        </div>
        <div>
            <span>Last updated </span>
            {dateFormatted}, {timeFormatted}
        </div>
    </article>

    const err = isError ? <span>{error?.data?.message}</span> : <></>
    const location = isSuccess ? locationData : <></>;


    return (
        <div className="location-data-container">
            {isError ? err : isLoading || isFetching ? <span>Loading...</span> : location}
        </div>
    )
}

export default LocationData