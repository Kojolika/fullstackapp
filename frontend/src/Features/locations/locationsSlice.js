import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        city:'Canton',
        province:'Michigan'
    },
    {   city: 'Toronto',
    province: 'Ontario'    
    }
];

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers:{
        getUserLocations: (state, action) =>
        {
            const {user, accessToken} = action.payload;

        },
        getCurrentLocation: (state, action) =>
        {

        },
        addLocation: (state,action) =>
        {
            const {city, province} = action.payload;
            state.locations = [...state.locations, {city, province}]
        }
    }
});

export const {getCurrentLocation, getUserLocations} = locationsSlice.actions;

export const selectAllLocations = (state) => state.locations;

export default locationsSlice.reducer;