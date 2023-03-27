import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers:{
        setUserLocations: (state, action) =>
        {
            const {locations} = action.payload;
            state.locations = locations;

        },
        addLocation: (state,action) =>
        {
            const {city, province} = action.payload;
            state.locations = [...state.locations, {city, province}]
        }
    }
});

export const {addLocation, setUserLocations} = locationsSlice.actions;

export const selectAllLocations = (state) => state.locations.locations;

export default locationsSlice.reducer;