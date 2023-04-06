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
            state.city = city;
            state.province = province;
            state.country = country;
        }
    }
});

export const { setLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

export const getLocation = (state) => {
    return {
        "city": state.currentLocation.city,
        "province": state.currentLocation.province,
        "country": state.currentLocation.country
    }
}

