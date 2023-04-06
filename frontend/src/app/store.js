import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../Features/auth/authSlice';
import locationsReducer from '../Features/locations/locationsSlice';
import currentLocationReducer from '../Features/locations/currentLocationSlice';

export const store = configureStore({
    reducer:{
        locations: locationsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        currentLocation: currentLocationReducer

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});