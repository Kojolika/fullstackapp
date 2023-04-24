import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: [],
    currentLocation: {
        "city": null,
        "province": null,
        "country": null,
        "latitude": null,
        "longitude": null,
        "id": null
    }
};

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setUserLocations: (state, action) => {
            const {locations}  = action.payload;
            state.locations = locations;

        },
        addLocation: (state, action) => {
            const { city, province, country, latitude, longitude, id } = action.payload;
            state.locations = [...state.locations, {
                "city": city,
                "province": province,
                "country": country,
                "latitude": latitude,
                "longitude": longitude,
                "id" : id
            }]
        },
        setCurrentLocation: (state, action) => {
            const { city, province, country, latitude, longitude, id } = action.payload;
            state.currentLocation = {
                "city": city,
                "province": province,
                "country": country,
                "latitude": latitude,
                "longitude": longitude,
                "id" : id //unique database id
            }
        }
    }
});

export const { addLocation, setUserLocations, setCurrentLocation } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllLocations = (state) => state.locations.locations;

export const selectCurrentLocation = (state) => {
    return state.locations.currentLocation;
}