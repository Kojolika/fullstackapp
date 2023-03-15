import { apiSlice } from "../../app/api/apiSlice";

//inject endpoint for the backend API to return user credentials
//react hook useLoginMutation is automaticly generated from 'login' endpoint
//https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values for more info on the auto generated hook

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: {...credentials} //credentials is a json object with fields: username, password
                //to implement headers at each endpoint check https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#text
            }),
        }),
        logout: builder.mutation({
            query: token => ({
                url: '/logout/access',
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/registration',
                method: 'POST',
                body: {...credentials}
            })
        }),
        getLocations: builder.query({
            query: username => ({
                url: '/locations',
                method: 'POST',
                body: {...username}
            })
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useGetLocationsQuery
} = authApiSlice;

