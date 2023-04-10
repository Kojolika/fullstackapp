import { useSelector, useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../Features/auth/authSlice";
import { useGetUserLocationsQuery } from "../../Features/auth/authApiSlice";
import { setLocation } from "../../Features/locations/currentLocationSlice";

import LocationWidget from "../Modules/LocationWidget";
import AddLocation from "../Modules/AddLocation";

import '../../Styles/locations.css';
import '../../Styles/app.css';

import { Plus, Delete } from "../../Icons/svgImages/index.js";


const TOOLBAR_STATE = {
    NONE: 'NONE',
    ADDING: 'ADDING',
    DELETING: 'DELETING',
    SEARCHING: 'SEARCHING'
}


const Locations = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(selectCurrentUser);
    const skipUserLocations = user ? false : true;
    const { data, isLoading, isSuccess, refetch } = useGetUserLocationsQuery({ 'username': user }, { skip: skipUserLocations });
    const locations = isSuccess ? data.locations : [];
    
    const [toolbarState, setToolbarState] = useState(TOOLBAR_STATE.NONE);

    const reloadData = () => refetch()
    
    const toggleAddMoodle = () => {
        if (toolbarState === TOOLBAR_STATE.ADDING) setToolbarState(TOOLBAR_STATE.NONE);
        else setToolbarState(TOOLBAR_STATE.ADDING);
    };
    const addLocationMoodle = toolbarState === TOOLBAR_STATE.ADDING ? <AddLocation reloadData={reloadData} toggleClose={toggleAddMoodle} /> : <></>
    const addLocationButton = <div className={toolbarState === TOOLBAR_STATE.ADDING ? "optionsButtons button-selected" : "optionsButtons"} onClick={() => toggleAddMoodle()}><Plus /></div>

    const toggleDeleting = () => {
        if (toolbarState === TOOLBAR_STATE.DELETING) setToolbarState(TOOLBAR_STATE.NONE)
        else setToolbarState(TOOLBAR_STATE.DELETING)
    }
    const deleteLocationButton = <div className={toolbarState === TOOLBAR_STATE.DELETING ? "optionsButtons button-selected" : "optionsButtons"} onClick={() => toggleDeleting()}><Delete /></div>

    const [markedForDeletionList, setMarkedForDeletionList] = useState([]);
    const addLocationToMarkedForDeletionList = id => {
        const newList = [...markedForDeletionList, id]
        setMarkedForDeletionList(newList);
    }
    const removeLocationFromMarkedForDeletionList = id => {
        const index = markedForDeletionList.indexOf(id);
        if (index > -1) { // only splice array when item is found
            const markedForDeletionListCopy = markedForDeletionList; // 2nd parameter means remove one item only
            const newArray1 = markedForDeletionListCopy.filter(item => item !== id)
            setMarkedForDeletionList(newArray1);
        }
    }
    const handleLocationDeletion = () => {

    }
    const confirmDeletionButton = markedForDeletionList.length !== 0 ?
        <div className="confirm-location-delete" onClick={() => handleLocationDeletion()}>
            {markedForDeletionList.length === 1 ? <span>Remove Location</span> : <span>Remove {markedForDeletionList.length} locations</span>}
        </div>
        : <></>;

    useEffect(() => {
        setMarkedForDeletionList([]);
    }, [toolbarState])

    const handleLocatonClick = (city, province, country) => {
        dispatch(setLocation({
            "city": city,
            "province": province,
            "country": country
        }));
        navigate('/location');
    }

    //if locations is being loaded still, just displaying loading text
    //otherwise if locations is empty, display text to tell the user to add a location
    //otherwise display all locations that the user has
    const renderedLocations = isLoading ?
        <div>loading...</div>
        : locations.length === 0 ?
            <div>Add a location to get started</div>
            : locations.map(location =>
                <LocationWidget
                    className="location"
                    key={location.id}
                    location_id={location.id}
                    country={location.country ? location.country : null}
                    province={location.province ? location.province : null}
                    city={location.city ? location.city : null}
                    latitude={location.latitude ? location.latitude : null}
                    longitude={location.longitude ? location.longitude : null}
                    toolbarState={toolbarState}
                    addLocationToMarkedForDeletionList={addLocationToMarkedForDeletionList}
                    removeLocationFromMarkedForDeletionList={removeLocationFromMarkedForDeletionList}
                    onClick = {handleLocatonClick}
                />)

    return (
        <div className="locationsMainPage">
            <div className="locationsContainer">
                {confirmDeletionButton}
                {addLocationMoodle}
                <div className="locationsOptionsArea border">
                    {addLocationButton}
                    {deleteLocationButton}
                </div>
                <div className="locationsList">
                    {renderedLocations}
                </div>
            </div>
        </div>
    )
}
export { TOOLBAR_STATE }
export default Locations;