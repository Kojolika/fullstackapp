import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../Features/auth/authSlice';

const url = 'http://localhost:5000';

const baseQuery = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders: (headers,{getState}) => {
        const token = getState().auth.token;
        if(token)
        {
            headers.set("authorization", `Bearer ${token}`)
        }
        headers.set('Access-Control-Allow-Origin', url)
        headers.set('Access-Control-Allow-Credentials', 'true')
        return headers;
    }

})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api ,extraOptions);

    if(result?.error?.originalStatus === 403)
    {
        console.log('sending refresh token');
        //send refresh token to get new accessToken
        const refreshResult = await baseQuery('/token/refresh', api, extraOptions);
        console.log(refreshResult);
        if(refreshResult?.data)
        {
            const user = api.getState().auth.user;
            //store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            //retry original query with new token
            result = await baseQuery(args, api, extraOptions);
        }else
        {
          api.dispatch(logOut());  
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})