import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    temperatureUnit: "Celcius",
    theme: "Light"
};

const preferenceSlice = createSlice({
    name: 'pref',
    initialState,
    reducers: {
        setTempUnit: (state, action) => {
            const {unit} = action.payload;
            state.temperatureUnit = unit;
            localStorage.setItem("temperatureUnit", unit);
        },
        setTheme: (state,action) =>{
            const {theme} = action.payload;
            state.theme = theme;
            localStorage.setItem("theme", theme);
        }
    }
});

export const { setTempUnit, setTheme } = preferenceSlice.actions;

export default preferenceSlice.reducer;

export const selectTempUnit = (state) => state.pref.temperatureUnit;
export const selectTheme = (state) => state.pref.theme;