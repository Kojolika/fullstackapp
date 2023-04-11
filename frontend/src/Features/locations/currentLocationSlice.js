import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "city": null,
    "province": null,
    "country": null
};

const currentLocationSlice = createSlice({
    name: 'currentLocation',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            const { city, province, country } = action.payload;
            state.city = {
                "name": city.name
            };
            state.province = {
                "name": province.name,
                "state_code": province.state_code
            }
            state.country = {
                "name": country.name,
                "iso2": country.iso2 //country 2 letter code
            };
        }
    }
});

export const { setLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

export const selectCurrentLocation = (state) => {
    return {
        "city": state.currentLocation.city,
        "province": state.currentLocation.province,
        "country": state.currentLocation.country
    }
}

