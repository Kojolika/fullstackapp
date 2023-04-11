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
        })
    })
})

export const {
    useGetlocationKeyQuery
} = accuWeatherApiSlice