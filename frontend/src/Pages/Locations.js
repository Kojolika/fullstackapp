import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllLocations, setUserLocations } from "../Features/locations/locationsSlice";
import { selectCurrentUser } from "../Features/auth/authSlice";
import { useGetUserLocationsQuery } from "../Features/auth/authApiSlice";
import { useState } from "react";

import AddLocationManual from "../Modules/AddLocationOptions/AddLocation";

import '../Styles/locations.css';

const Locations = () => {

    const user = useSelector(selectCurrentUser);
    const { data, error, isLoading } = useGetUserLocationsQuery({ 'username': user });

    const locations = isLoading ? [] : error ? [] : data.locations;
    //const dispatch = useDispatch();
    //dispatch(setUserLocations(locations));

    //if locations is being loaded still, just displaying loading text
    //otherwise if locations is empty, display text to tell the user to add a location
    //otherwise display all locations that the user has
    const renderedLocations = isLoading ?
        <div>loading...</div>
        : locations === [] ?
            <div>Add a location to get started</div>
            : locations.map(location =>
                <article className="location" key={location.id}>
                    <h2>{location.city === null ? location.latitude : location.city},
                        {location.province === null ? location.longitude : location.province}</h2>
                </article>
            )
    
    const onClose = () => {
        setAddLocationPopUp(0);
        setIsAddLocationButtonEnabled(true);
    };

    const [isAddLocationButtonEnabled, setIsAddLocationButtonEnabled] = useState(true);
    const [addLocationPopUp, setAddLocationPopUp] = useState(0);
    const addLocationMoodle = addLocationPopUp === 0 ? <></> : <AddLocationManual onClose={onClose}/>
    
    const handleSubmit = () => {
        setIsAddLocationButtonEnabled(false);
        setAddLocationPopUp(1)
    }
    const  addLocationButton = isAddLocationButtonEnabled ? <button onClick={() => handleSubmit()}>Add New Location</button> : <></> 
    return (
        <div>
            {addLocationMoodle}
            {addLocationButton}
            <div className="locationsMainPage">
                {renderedLocations}
            </div>   
        </div>
    )
}

export default Locations;