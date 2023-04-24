import { apiSlice } from "../../app/api/apiSlice";

//inject endpoint for the backend API to return user credentials
//react hook useGetUserLocationsQuery is automaticly generated from 'getUserLocations' endpoint
//https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values for more info on the auto generated hook

export const locationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserLocations: builder.query({
            query: username => ({
                url: '/locations',
                method: 'POST',
                body: {...username}
            })
        }),
        addUserLocation: builder.mutation({
            query: locationData => ({
                url: '/addLocation',
                method: 'POST',
                body: {...locationData}
            })
        }),
        deleteUserLocations: builder.mutation({
            query: idsAndUsername =>({
                url: '/deleteLocations',
                method: 'DELETE',
                body: {...idsAndUsername}
            })
        })
    })
})

export const {
    useGetUserLocationsQuery,
    useLazyGetUserLocationsQuery,
    useAddUserLocationMutation,
    useDeleteUserLocationsMutation
} = locationsApiSlice;

