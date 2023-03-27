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
            transformResponse: (response, meta, arg) => response.data,
        }),
        getStates: builder.query({
            query: country => ({
                url: '/airVisualApi/states',
                method: 'POST',
                body: { ...country }
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        getCities: builder.query({
            query: stateAndCountry => ({
                url: '/airVisualApi/cities',
                method: 'POST',
                body: { ...stateAndCountry }
            }),
            transformResponse: (response, meta, arg) => response.data,
        })
    })
})

export const {
    useGetCitiesQuery,
    useGetCountriesQuery,
    useGetStatesQuery
} = locationApiSlice;

