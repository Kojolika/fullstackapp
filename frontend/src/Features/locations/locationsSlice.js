import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    locations: []
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setUserLocations: (state, action) => {
            const { locations } = action.payload;
            state.locations = locations;

        },
        addLocation: (state, action) => {
            const { city, province, country } = action.payload;
            state.locations = [...state.locations, {
                "city": city,
                "province": province,
                "country": country
            }]
        }
    }
});

export const { addLocation, setUserLocations } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllLocations = (state) => state.locations.locations;

