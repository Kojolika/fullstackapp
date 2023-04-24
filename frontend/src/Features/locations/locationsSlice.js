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

//must make a function out of array.includes
//because filter only accepts functions not methods on an object
const isInArray = (num,list) =>{
    return list.includes(num);
}

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
        deleteLocations: (state, action) => {
            const {ids} = action.payload;
            console.log(ids);
            const locationsAfterRemoval = state.locations.filter(location => !isInArray(location.id,ids));
            state.locations = locationsAfterRemoval;
            console.log('after removal: ');
            console.log(locationsAfterRemoval);
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

export const { addLocation, setUserLocations, setCurrentLocation, deleteLocations } = locationsSlice.actions;

export default locationsSlice.reducer;

export const selectAllLocations = (state) => state.locations.locations;

export const selectCurrentLocation = (state) => state.locations.currentLocation;
