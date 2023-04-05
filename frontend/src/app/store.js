import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import authReducer from '../Features/auth/authSlice';
import locationsReducer from '../Features/locations/locationsSlice';
import chooseLocationToAddReducer from '../Features/locations/chooseLocationToAddSlice';

export const store = configureStore({
    reducer:{
        locations: locationsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        locationToAdd: chooseLocationToAddReducer

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});