import { useSelector } from "react-redux"
import { useState } from "react";

import { selectCurrentLocation } from "../../Features/locations/locationsSlice"
import { useGetCityWeatherDataQuery } from "../../Features/locations/airVisualApiSlice";
import { useGetDailyForecast5DaysQuery, useGetHourlyForecast12HoursQuery, useGetLocationKeyQuery } from "../../Features/locations/accuWeatherApiSlice";

import '../../Styles/location.css';
import '../../Styles/app.css';

import { StarBorder, StarFilled, ArrowLeft, ArrowRight } from "../../Icons/svgImages/index.js";
import { selectCurrentUser } from "../../Features/auth/authSlice";
import { selectTempUnit } from "../../Features/user_preferences/preferenceSlice";

import Temperature from "../Atoms/Temperature";
import WeatherIcon from "../Atoms/WeatherIcon";
import { WaterDrop } from "../../Icons/svgImages/Weather Icons";

const LocationData = () => {
    const [isFavorited, setIsFavorited] = useState(false);

    const user = useSelector(selectCurrentUser);
    const locationBeingDisplayed = useSelector(selectCurrentLocation);

    //this is for Air Visual API, you need to query it as 'USA' not 'United States'
    const locationBeingDisplayAirVisualCall = locationBeingDisplayed?.country?.name === 'United States' ?
        {
            "city": locationBeingDisplayed.city,
            "province": locationBeingDisplayed.province,
            "country": {
                "name": "USA",
                "iso2": locationBeingDisplayed.country.iso2
            }
        } : locationBeingDisplayed;

    const skip = locationBeingDisplayed.city === null ? true : false;

    const { currentData: currentDataAirVisual, //returns temperature in Celcius
        isLoading: isLoadingAirVisual,
        isSuccess: isSuccessAirVisual,
        error: errorAirVisual,
        isError: isErrorAirVisual,
        isFetching: isFetchingAirVisual } = useGetCityWeatherDataQuery(locationBeingDisplayAirVisualCall, { skip })

    const { currentData: locationKey } = useGetLocationKeyQuery(locationBeingDisplayed, { skip });
    console.log(locationKey);

    const skipForecasts = locationKey === undefined ? true : false;
    const { currentData: currentDataDailyForecast5Days,
        isSuccess: isSuccess5DayForecast,
        isFetching: isFetching5DayForecast
    } = useGetDailyForecast5DaysQuery(locationKey, { skip: skipForecasts });
    const { currentData: currentDataHourlyForecast12Hours,
        isSuccess: isSuccess12HourForecast,
        isFetching: isFetching12HourForecast
    } = useGetHourlyForecast12HoursQuery(locationKey, { skip: skipForecasts });

    console.log(currentDataDailyForecast5Days);
    console.log(currentDataHourlyForecast12Hours);

    const locationName = locationBeingDisplayed.city === null ? <></> : <div id='location-name'>
        {locationBeingDisplayed.city.name}, {locationBeingDisplayed.province.name}, {locationBeingDisplayed.country.name}
    </div>

    const dateFormatted = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.ts.slice(5, 10) : <></>
    const timeFormatted = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.ts.slice(11, 16) : <></>

    const temperatureUnit = useSelector(selectTempUnit);
    const tempDegreeLetter = temperatureUnit === "Celcius" ? 'C' : 'F';

    const currentTemperature = isSuccessAirVisual ?
        <span><Temperature options={{ temperature: currentDataAirVisual?.data?.current?.weather?.tp, unit: "Celcius" }} />°{tempDegreeLetter} </span>
        : <></>



    const fiveDayForecastArray = isSuccess5DayForecast ? currentDataDailyForecast5Days.DailyForecasts : [];
    const accuWeatherTodaysWeatherData = fiveDayForecastArray[0];
    const fiveDayForecastsDisplay = fiveDayForecastArray.map(forecast =>
        <div key={forecast?.Date} id="individual-forecast-day" className="weather-panel border">
            <div className="flex-column">
                <div id='weather-date'>
                    {forecast?.Date.slice(8, 10)}
                </div>
                <div className="flex-row">
                    <div className="weather-icon">
                        <WeatherIcon id={forecast?.Day?.Icon} height={48} width={48} />
                    </div>
                    <div id="temp-min-max">
                        <span><Temperature options={{ temperature: forecast?.Temperature?.Maximum?.Value, unit: "Fahrenheit" }} />°</span>
                        <span><Temperature options={{ temperature: forecast?.Temperature?.Minimum?.Value, unit: "Fahrenheit" }} />°</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const [twelveHourForecastState, setTwelveHourForecastState] = useState("firstHalf"); //two states, "firstHalf", "lastHalf"
    const handleTwelveHourButtonClick = () => {
        if (twelveHourForecastState === "firstHalf") {
            setTwelveHourForecastState("lastHalf");
        }
        else {
            setTwelveHourForecastState("firstHalf");
        }
    }

    const twelveHourForecastArray = isSuccess12HourForecast ? currentDataHourlyForecast12Hours : [];
    const twelveHourForecastDisplay = twelveHourForecastArray.map((forecast, index) =>
        <div key={forecast?.DateTime} id={twelveHourForecastState === "firstHalf" ? "individual-forecast-hour-first-half" : "individual-forecast-hour-last-half"}>
            <div>
                {forecast?.DateTime.slice(11, 16)}
            </div>
            <div className="weather-icon" >
                Icon{forecast?.WeatherIcon}
            </div>
            <div>
                <Temperature options={{ temperature: forecast?.Temperature?.Value, unit: "Fahrenheit" }} />°
            </div>
            <div>
                {forecast?.IconPhrase}
            </div>
            <div>
                <div id='precip'><WaterDrop />{forecast?.PrecipitationProbability}%</div>
            </div>
        </div>
    )

    const toggleFavorite = () => {
        if (isFavorited) setIsFavorited(false);
        else setIsFavorited(true);
    }
    const addLocationToUserDatabase = () => {

    }

    const locationData = <article id="location-data-display" className="border" >
        <div id={user ? 'favorites-button' : 'favorites-button-disabled'} className="flex-center-align" onClick={user ? () => toggleFavorite() : null}>
            {isFavorited ? <StarFilled /> : <StarBorder />}
        </div>
        {locationName}
        <div id="location-data" >
            <div id='weather' className="weather-panel border">
                <WeatherIcon id={accuWeatherTodaysWeatherData?.Day?.Icon} />
                <div>
                    <div id='temperature'>{currentTemperature}</div>
                </div>
                <div id="today-phrase-and-precip">
                    <div>{accuWeatherTodaysWeatherData?.Day?.IconPhrase}</div>
                    <div id='precip'><WaterDrop />{twelveHourForecastArray[0]?.PrecipitationProbability}%</div>
                </div>
            </div>
            <div className="flex-column">
                <div className="other-weather-data-entry weather-panel border" id="humidity">
                    <label htmlFor="humidity">Humidity</label>
                    <span>{currentDataAirVisual?.data?.current?.weather?.hu}% </span>
                </div>
                <div className="other-weather-data-entry weather-panel border" id='AQI'>
                    <label htmlFor="AQI">Air Quality</label>
                    {currentDataAirVisual?.data?.current?.pollution?.aqius}
                </div>
            </div>
        </div>
        <div className="flex-row weather-panel-seperation ">
            <div className="other-weather-data-entry weather-panel border" id="wind-speed">
                <label htmlFor="wind-speed">Wind Speed</label>
                {currentDataAirVisual?.data?.current?.weather?.ws} m/s
            </div>
            <div className="other-weather-data-entry weather-panel border" id='wind-direction'>
                <label htmlFor="wind-direction">Wind Direction</label>
                {currentDataAirVisual?.data?.current?.weather?.wd}° {/* wind direction, as an angle of 360° (N=0, E=90, S=180, W=270) */}
            </div>
            <div className="other-weather-data-entry weather-panel border" id='atmospheric-pressure'>
                <label htmlFor="atmospheric-pressure">Atmospheric Pressure</label>
                {currentDataAirVisual?.data?.current?.weather?.pr} hPa
            </div>
        </div>
        <div id="hourly-forecast-container" className="weather-panel-seperation">
            <div id='hourly-forecast' className="weather-panel border">
                {twelveHourForecastDisplay}
            </div>
            <div id="hourly-arrow-container">
                <div id={twelveHourForecastState === "firstHalf" ? "hourly-arrow-right" : "hourly-arrow-left"}
                    className="weather-panel border"
                    onClick={() => handleTwelveHourButtonClick()}>
                    {twelveHourForecastState === "firstHalf" ? <ArrowRight /> : <ArrowLeft />}
                </div>
            </div>
        </div>
        <div id='five-day-forecast' >
            {fiveDayForecastsDisplay}
        </div>
        <div id="last-updated">
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