import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectAllLocations, setUserLocations } from "../Features/locations/locationsSlice";
import { selectCurrentUser } from "../Features/auth/authSlice";
import { useGetLocationsQuery } from "../Features/auth/authApiSlice";

import '../Styles/locations.css';

const Locations = () => {

    const user = useSelector(selectCurrentUser);
    const { data, error, isLoading } = useGetLocationsQuery({ 'username': user });

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

    return (
        <div className="locationsMainPage">
            {renderedLocations}
        </div>
    )
}

export default Locations;