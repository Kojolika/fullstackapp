import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../Features/auth/authSlice';

const url = 'http://localhost:5000';

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        const csrfAccessToken = getState().auth.csrfAccessToken;
        if (csrfAccessToken) {
            headers.set('X-CSRF-ACCESS-TOKEN', '' + csrfAccessToken);
        }
        headers.set('Access-Control-Allow-Origin', url);
        headers.set('Access-Control-Allow-Credentials', 'true');
        headers.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        return headers;
    }

})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args);
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);

    if (result?.error?.status === 403) {
        console.log('sending refresh token');
        //send refresh token to get new accessToken
        const refreshResult = await baseQuery({ method: 'POST', url: '/token/refresh' }, api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            const csrfAccessToken = refreshResult.data.csrf_access_token;

            //store the new token
            api.dispatch(setCredentials({ user, csrfAccessToken }))

            //retry original query with new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
            console.log('logging out..');
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})