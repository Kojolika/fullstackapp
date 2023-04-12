import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../Features/auth/authSlice';
import locationsReducer from '../Features/locations/locationsSlice';
import preferenceReducer from '../Features/user_preferences/preferenceSlice';

export const store = configureStore({
    reducer:{
        locations: locationsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        pref: preferenceReducer
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});