import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";


import { addLocation, deleteLocations, selectAllLocations, selectCurrentLocation, setCurrentLocation } from "../../Features/locations/locationsSlice"
import { useGetCityWeatherDataQuery } from "../../Features/locations/airVisualApiSlice";
import { useGetDailyForecast5DaysQuery, useGetHourlyForecast12HoursQuery, useGetLocationKeyQuery } from "../../Features/locations/accuWeatherApiSlice";
import { useAddUserLocationMutation, useDeleteUserLocationsMutation } from "../../Features/locations/locationsApiSlice";
import { selectCurrentUser } from "../../Features/auth/authSlice";
import { selectTempUnit } from "../../Features/user_preferences/preferenceSlice";

import '../../Styles/location.css';
import '../../Styles/app.css';

import { StarBorder, StarFilled, ArrowLeft, ArrowRight, Sunglasses, Info } from "../../Icons/svgImages/index.js";
import { WaterDrop } from "../../Icons/svgImages/Weather Icons";

import Temperature from "../Atoms/Temperature";
import WeatherIcon from "../Atoms/WeatherIcon";
import Month from "../Atoms/Month";
import Time from "../Atoms/Time";
import AirQuality from "../Atoms/AirQuality";
import Wind from "../Atoms/Wind";
import ToolTip from "../Atoms/ToolTip";
import Loading from "../Atoms/Loading";

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
            }
        } : locationBeingDisplayed;

    const skip = locationBeingDisplayed.city === null ? true : false;

    const { currentData: currentDataAirVisual, //returns temperature in Celcius
        isLoading: isLoadingAirVisual,
        isSuccess: isSuccessAirVisual,
        error: errorAirVisual,
        isError: isErrorAirVisual,
        isFetching: isFetchingAirVisual } = useGetCityWeatherDataQuery(locationBeingDisplayAirVisualCall, { skip })
 
    const lastUpdatedhour = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.ts.slice(11, 13) : null;

    const { currentData: currentDataCityData, isSuccess: isSuccessCityData } = useGetLocationKeyQuery(locationBeingDisplayed, { skip });

    const timezone = isSuccessCityData ? currentDataCityData?.TimeZone?.Code : 'UTC' // UTC time if no timezone is fetched
    const gmtOffset = isSuccessCityData ? currentDataCityData?.TimeZone?.GmtOffset : 0 // UTC time if no offset is fetched

    const locationKey = currentDataCityData?.Key;

    const skipForecasts = locationKey === undefined ? true : false;
    const { currentData: currentDataDailyForecast5Days,
        isSuccess: isSuccess5DayForecast,
        isFetching: isFetching5DayForecast
    } = useGetDailyForecast5DaysQuery(locationKey, { skip: skipForecasts });
    const { currentData: currentDataHourlyForecast12Hours,
        isSuccess: isSuccess12HourForecast,
        isFetching: isFetching12HourForecast
    } = useGetHourlyForecast12HoursQuery(locationKey, { skip: skipForecasts });

    //Display of location name at the top of the page
    const locationName = locationBeingDisplayed.city === null ? <></> : <div id='location-name'>
        {locationBeingDisplayed.city.name}, {locationBeingDisplayed.province.name}, {locationBeingDisplayed.country.name}
    </div>

    //Last updated time from Air Visual
    const timeFormatted = isSuccessAirVisual ?
        <div>
            <Time offset={gmtOffset} number={currentDataAirVisual?.data?.current?.weather?.ts.slice(11, 16)} /> {timezone}
        </div>
        : <></>

    //Gets the users preferenced temperature unit
    const temperatureUnit = useSelector(selectTempUnit);
    const tempDegreeLetter = temperatureUnit === "Celcius" ? 'C' : 'F';

    //Mock data for when the data cannot be retrieved
    const fiveDayForecastMock = [
        {
            Date: '2023-04-14T16:00:00',
            Day: {
                Icon: 1,
                IconPhrase: "Sunny"
            },
            Temperature: {
                Maximum: {
                    Value: 78
                },
                Minimum: {
                    Value: 49
                }
            }
        },
        {
            Date: '2023-04-15T16:00:00',
            Day: {
                Icon: 32
            },
            Temperature: {
                Maximum: {
                    Value: 90
                },
                Minimum: {
                    Value: 75
                }
            }
        },
        {
            Date: '2023-04-16T16:00:00',
            Day: {
                Icon: 8
            },
            Temperature: {
                Maximum: {
                    Value: 67
                },
                Minimum: {
                    Value: 44
                }
            }
        },
        {
            Date: '2023-04-17T16:00:00',
            Day: {
                Icon: 19
            },
            Temperature: {
                Maximum: {
                    Value: 84
                },
                Minimum: {
                    Value: 52
                }
            }
        },
        {
            Date: '2023-04-18T16:00:00',
            Day: {
                Icon: 1
            },
            Temperature: {
                Maximum: {
                    Value: 53
                },
                Minimum: {
                    Value: 41
                }
            }
        }
    ]
    const twelveHourForecastMock = [
        {
            DateTime: '2023-04-14T16:00:00',
            WeatherIcon: 21,
            Temperature: {
                Value: 82
            },
            PrecipitationProbability: 24,
        },
        {
            DateTime: '2023-04-14T17:00:00',
            WeatherIcon: 22,
            Temperature: {
                Value: 85
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T18:00:00',
            WeatherIcon: 5,
            Temperature: {
                Value: 75
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T19:00:00',
            WeatherIcon: 26,
            Temperature: {
                Value: 89
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T20:00:00',
            WeatherIcon: 18,
            Temperature: {
                Value: 78
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T21:00:00',
            WeatherIcon: 19,
            Temperature: {
                Value: 63
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T22:00:00',
            WeatherIcon: 6,
            Temperature: {
                Value: 68
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T23:00:00',
            WeatherIcon: 13,
            Temperature: {
                Value: 73
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T00:00:00',
            WeatherIcon: 25,
            Temperature: {
                Value: 83
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T01:00:00',
            WeatherIcon: 29,
            Temperature: {
                Value: 65
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T02:00:00',
            WeatherIcon: 17,
            Temperature: {
                Value: 56
            },
            PrecipitationProbability: 24
        },
        {
            DateTime: '2023-04-14T03:00:00',
            WeatherIcon: 15,
            Temperature: {
                Value: 53
            },
            PrecipitationProbability: 24
        }
    ]

    //Five days forecast data from AccuWeather
    const fiveDayForecastArray = isSuccess5DayForecast ? currentDataDailyForecast5Days.DailyForecasts : fiveDayForecastMock;

    //Five days forecast data displayed as html components
    const fiveDayForecastsDisplay = fiveDayForecastArray.map((forecast, index) =>
        <div key={forecast?.Date} id="individual-forecast-day" className="weather-panel border">
            <div className="flex-column flex-center-align" id="forecast-container">
                <div id='individual-forecast-weather-date' className="flex-center-align">
                    {index === 0 ? <div>Today</div> //todays date is when the index is 0
                        : <div>
                            <Month number={forecast?.Date.slice(6, 7)} abr={true} /> {forecast?.Date.slice(8, 10)}
                        </div>}
                </div>
                <div className="flex-row" >
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

    //the state of the hourly forecast button
    const [twelveHourForecastState, setTwelveHourForecastState] = useState("firstHalf"); //two states, "firstHalf", "lastHalf"
    const handleTwelveHourButtonClick = () => {
        if (twelveHourForecastState === "firstHalf") {
            setTwelveHourForecastState("lastHalf");
        }
        else {
            setTwelveHourForecastState("firstHalf");
        }
    }

    //Button that manages the hourly forecast menu, showing the first half of the forecasts or the last half
    //Showing hours of forecasts is a lot so I split it on two pages
    const hourlyForecastButton = <div id={twelveHourForecastState === "firstHalf" ? "hourly-arrow-right" : "hourly-arrow-left"}
        className="weather-panel border"
        onClick={() => handleTwelveHourButtonClick()}>
        {twelveHourForecastState === "firstHalf" ? <ArrowRight /> : <ArrowLeft />}
    </div>

    //Checks which hour of the hourly forcast from AccuWeather corresponds to the current last updated hour from Air Visual data
    const [hourlyIndex, setHourlyIndex] = useState(0);
    useEffect(() => {
        if (isSuccess12HourForecast) {
            currentDataHourlyForecast12Hours.forEach((entry, index) => {
                if (entry.DateTime.slice(11, 13) === lastUpdatedhour) {
                    setHourlyIndex(index);
                    return;
                }
            })
        }
    }, [isSuccess12HourForecast])

    //hourly array of forecasts data
    const twelveHourForecastArray = isSuccess12HourForecast ? currentDataHourlyForecast12Hours.slice(hourlyIndex) //remove hours before current data (who wants to see weather history?)
        : twelveHourForecastMock;

    //hourly forecast React element
    const twelveHourForecastDisplay = twelveHourForecastArray.map((forecast, index) =>
        <div key={forecast?.DateTime} className={twelveHourForecastState === "firstHalf" ? "first-half" : "last-half"} id="individual-forecast-hour">
            <div id="hourly-time">
                <Time offset={gmtOffset} number={forecast?.DateTime.slice(11, 16)} />
            </div>
            <div id="hourly-phrase">
                {forecast?.IconPhrase}
            </div>
            <div className="weather-icon flex-center-align" >
                <WeatherIcon id={forecast?.WeatherIcon} />
            </div>

            <div>
                <Temperature options={{ temperature: forecast?.Temperature?.Value, unit: "Fahrenheit" }} />°
            </div>
            <div>
                <div id='precip'><WaterDrop />{forecast?.PrecipitationProbability}%</div>
            </div>
        </div>
    )

    //Added the a last entry to the hourly forecast if theres any gaps
    //ie this will display if previous hours of forecast were removed
    //The hourly forecast display is meant for 12 but sometimes will display less (AccuWeather returns previous hours of data)
    twelveHourForecastDisplay.push(<div key={"no-way-date-is-this"} className={twelveHourForecastState === "firstHalf" ? "first-half" : "last-half"} style={{ justifyContent: "center" }} id="individual-forecast-hour">
        <div className="flex-center-align">Updates every hour!</div>
        <div className="flex-center-align"><Sunglasses /></div>
    </div>)

    //Current temperature number from Air Visual API
    const currentTemperature = isSuccessAirVisual ?
        <span><Temperature options={{ temperature: currentDataAirVisual?.data?.current?.weather?.tp, unit: "Celcius" }} />°{tempDegreeLetter} </span>
        : <></>

    //wind direction from Air Visual API, as an angle of 360° (N=0, E=90, S=180, W=270)
    const windDirection = isSuccessAirVisual ? currentDataAirVisual?.data?.current?.weather?.wd : 0;

    const favoriteButton = <div className={user ? 'favorites-button flex-center-align' : 'favorites-button-disabled flex-center-align'} onClick={user ? () => toggleFavorite() : null}>
        {isFavorited ? <StarFilled /> : <StarBorder />}
    </div>

    //set favorited if location is in user favorites, otherwise defualt is not favorited
    //cannot use id to check, locations searched up via the searchbar do not have an id yet
    const allUserLocations = useSelector(selectAllLocations);
    useEffect(() => {
        for (let index = 0; index < allUserLocations.length; index++) {
            if (allUserLocations[index].city.name === locationBeingDisplayed.city.name
                && allUserLocations[index].province.name === locationBeingDisplayed.province.name
                && allUserLocations[index].country.name === locationBeingDisplayed.country.name) {
                setIsFavorited(true);
                return;
            }
        }
        setIsFavorited(false);
    }, [locationBeingDisplayed])



    //Function that toggles weather or not the location is favorited
    const toggleFavorite = () => {
        if (isFavorited) {
            setIsFavorited(false);
            removeLocationFromUser();
        }
        else {
            setIsFavorited(true);
            addLocationToUser();
        }
    }

    const dispatch = useDispatch();
    const [addLocationToBackendDB, { isLoading: isLoadingAddingToDatabase }] = useAddUserLocationMutation();

    //Adds the location to the user database
    const addLocationToUser = async () => {
        try {
            //send backend request
            const response = await addLocationToBackendDB({ username: user, ...locationBeingDisplayed }).unwrap();
            const unique_id = response.id; //unique id of location in database

            //this is under the assumption the location is now already in the database
            //need to change the database response if the location is added to just add new user id
            const { id, ...locationWithoutId } = locationBeingDisplayed;
            const locationWithUniqueId = { ...locationWithoutId, id: unique_id };

            dispatch(setCurrentLocation({ ...locationWithUniqueId }));

            //set application logic
            dispatch(addLocation({ ...locationWithUniqueId }));

            //backend request contains unique restraint so only 1 of each location can be added
            //calling both in the same try block ensures the unique constraint holds for the application logic dispatch
            //and ensures server and frontend state sync

        } catch (error) {
            console.log(error);
        }

    }
    const [deleteLocationFromBackendDB, {isLoading: isLoadingDeletingLocationFromDatabase}] = useDeleteUserLocationsMutation();

    const removeLocationFromUser = async () => {
        try {
            //send backend request
            //ids need not be a list, backend can still process the request 
            await deleteLocationFromBackendDB({username: user, ids: locationBeingDisplayed.id}).unwrap();

            //set application logic
            dispatch(deleteLocations({ids:[locationBeingDisplayed.id]}));

            //calling both in the same try block ensures server and frontend state sync
        }
        catch (error) {
            console.log(error);
        }

    }

    //Final location data display container
    const locationData = <article id="location-data-display" className="border" >
        <div id="data-formatting-container" className="flex-center-align flex-column">
            {isLoadingAddingToDatabase || isLoadingDeletingLocationFromDatabase? <Loading height={48} width={48} className='favorites-button' /> : favoriteButton}
            {locationName}
            <div id="location-data" className="weather-panel-seperation" >
                <div className="flex-column flex-center-align" id="top-row-left-data">

                    <div id='weather' className="weather-panel border">
                        <WeatherIcon id={twelveHourForecastArray[0]?.WeatherIcon} />
                        <div>
                            <div id='temperature'>{currentTemperature}</div>
                        </div>
                        <div id="today-phrase-and-precip">
                            <div>{twelveHourForecastArray[0]?.IconPhrase}</div>
                            {<div id='precip'><WaterDrop />{twelveHourForecastArray[0]?.PrecipitationProbability}%</div>}
                        </div>
                    </div>
                    <div className="flex-row" id="other-weather-data">
                        <div className="other-weather-data-entry weather-panel border">
                            <Wind windDirection={windDirection} speed={currentDataAirVisual?.data?.current?.weather?.ws} />
                        </div>
                        <div className="other-weather-data-entry weather-panel border" id='atmospheric-pressure'>
                            <div className="flex-row" style={{ gap: '3px' }}>
                                <label htmlFor="atmospheric-pressure">Pressure</label>
                                <ToolTip item={<Info height={16} width={16} />} label={'Atmospheric Pressure'} text={'Pressure caused by the weight of the atmosphere. At sea level it has a mean value of 1,013.25 hPa but reduces with increasing altitude.'} />
                            </div>
                            {currentDataAirVisual?.data?.current?.weather?.pr} hPa
                        </div>
                    </div>
                </div>

                <div className="flex-column flex-center-align" id="top-row-right-data">
                    <div className="weather-panel border flex-column flex-center-align" id='AQI'>
                        <AirQuality number={currentDataAirVisual?.data?.current?.pollution?.aqius} />
                    </div>

                    <div className="weather-panel border flex-column flex-center-align" id="humidity">
                        <div className="flex-row" style={{ gap: '3px' }}>
                            <label htmlFor="humidity">Humidity</label>
                            <ToolTip item={<Info height={16} width={16} />} text={'Humidity is the amount of water vapor in the atmosphere. High humidity often feels moist or muggy, while low humidity can feel dry and create static electricity. Consider 40% to 50% humidity as normal or comfortable for indoors.'} />
                        </div>
                        <span>{currentDataAirVisual?.data?.current?.weather?.hu}% </span>
                    </div>

                </div>
            </div>
            <div id="hourly-forecast-container" className="weather-panel-seperation">
                <div id='hourly-forecast' className="weather-panel border">
                    {twelveHourForecastDisplay}
                </div>
                <div id="hourly-arrow-container">
                    {hourlyForecastButton}
                </div>
            </div>
            <div id='five-day-forecast' className="weather-panel-seperation" >
                {fiveDayForecastsDisplay}
            </div>
            <div id="last-updated" className="flex-row">
                <span>Last updated </span>
                {timeFormatted}
            </div>
        </div>
    </article>

    const err = isErrorAirVisual ? <span>{errorAirVisual?.data?.message}</span> : <></>
    const location = isSuccessAirVisual ? locationData : <></>;


    return (
        <div className="location-data-container">
            {isErrorAirVisual ? err : isLoadingAirVisual || isFetchingAirVisual ? <Loading width={96} height={96} /> : location}
        </div>
    )
}

export default LocationData