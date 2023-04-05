import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "city": null,
    "province": null,
    "country": null
};

const chooseLocationToAddSlice = createSlice({
    name: 'locationToAdd',
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

export const { setLocation } = chooseLocationToAddSlice.actions;

export default chooseLocationToAddSlice.reducer;

export const getLocation = (state) => {
    return {
        "city": state.locationToAdd.city,
        "province": state.locationToAdd.province,
        "country": state.locationToAdd.country
    }
}

