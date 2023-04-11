import { apiSlice } from "../../app/api/apiSlice";

//inject endpoint for the backend API to return user credentials
//https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values for more info on the auto generated hook

export const accuWeatherApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLocationKey: builder.query({
            query: location => ({
                url: '/accuWeatherApi/locationKey',
                method: 'POST',
                body: {...location}
            })
        }),
        getDailyForecast: builder.query({
            query: locationKey => ({
                url: '/accuWeatherApi/dailyForecast',
                method: 'POST',
                body: {
                    "location_key": locationKey
                }
            })
        }),
        getDailyForecast5Days: builder.query({
            query: locationKey => ({
                url: '/accuWeatherApi/dailyForecast5Days',
                method: 'POST',
                body: {
                    "location_key": locationKey
                }
            })
        }),
        getHourlyForecast12Hours: builder.query({
            query: locationKey =>({
                url: '/accuWeatherApi/hourlyForecast12Hours',
                method: 'POST',
                body: {
                    "location_key": locationKey
                }
            })
        })
    })
})

export const {
    useGetLocationKeyQuery,
    useGetDailyForecastQuery,
    useGetDailyForecast5DaysQuery,
    useGetHourlyForecast12HoursQuery
} = accuWeatherApiSlice