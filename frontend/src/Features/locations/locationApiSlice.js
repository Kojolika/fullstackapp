import { apiSlice } from "../../app/api/apiSlice";

//inject endpoint for the backend API to return user credentials
//https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values for more info on the auto generated hook

export const locationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCountries: builder.query({
            query: () => ({
                url: '/airVisualApi/countries',
                method: 'GET'
            }),
        }),
        getStates: builder.query({
            query: country => ({
                url: '/airVisualApi/states',
                method: 'POST',
                body: country
            })
        }),
        getCities: builder.query({
            query: stateAndCountry => ({
                url: '/airVisualApi/cities',
                method: 'POST',
                body: {
                    "country"  : stateAndCountry.country,
                    "state" : stateAndCountry.state  
                }
            })
        })
    })
})

export const {
    useGetCitiesQuery,
    useGetCountriesQuery,
    useGetStatesQuery
} = locationApiSlice;

