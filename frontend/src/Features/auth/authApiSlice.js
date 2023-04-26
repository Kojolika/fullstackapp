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
                body: { ...credentials } //credentials is a json object with fields: username, password
                //to implement headers at each endpoint check https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#text
            }),
        }),
        logoutAccess: builder.mutation({
            query: token => ({
                url: '/logout/access',
                method: 'DELETE'
            })
        }),
        logoutRefresh: builder.mutation({
            query: () => ({
                url: '/logout/refresh',
                method: 'DELETE',
                headers:{
                    'X-CSRF-REFRESH-TOKEN': getcsrfRefreshToken()
                }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/registration',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refreshAccessToken: builder.mutation({
            query: () => ({
                url: '/login/refresh',
                method: 'POST',
                headers:{
                    'X-CSRF-REFRESH-TOKEN': getcsrfRefreshToken()
                }
            })
        })
    })
})

const getcsrfRefreshToken = () => {
    const cookies = document.cookie;
    if(!cookies) return;
    const seperatedCookies = cookies.split('; ');
    const csrfRefreshTokenCookie = seperatedCookies.find((element)=>element.startsWith("csrf_refresh_token="));
    const csrfRefreshToken = csrfRefreshTokenCookie.split('=')[1];

    return csrfRefreshToken;
}

export const {
    useLoginMutation,
    useLogoutAccessMutation,
    useLogoutRefreshMutation,
    useRegisterMutation,
    useRefreshAccessTokenMutation
} = authApiSlice;

