import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { selectAllLocations, setCurrentLocation, deleteLocations } from "../../Features/locations/locationsSlice";

import LocationWidget from "../Modules/LocationWidget";

import '../../Styles/locations.css';
import '../../Styles/app.css';

import { Delete } from "../../Icons/svgImages/index.js";
import { useDeleteUserLocationsMutation } from "../../Features/locations/locationsApiSlice";
import { selectCurrentUser } from "../../Features/auth/authSlice";


const TOOLBAR_STATE = {
    NONE: 'NONE',
    DELETING: 'DELETING'
}


const Locations = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLocations = useSelector(selectAllLocations);
    const locations = userLocations ? userLocations : [];

    const [toolbarState, setToolbarState] = useState(TOOLBAR_STATE.NONE);

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
            const markedForDeletionListCopy = markedForDeletionList;
            const newArray1 = markedForDeletionListCopy.filter(item => item !== id)
            setMarkedForDeletionList(newArray1);
        }
    }

    const user = useSelector(selectCurrentUser);
    const [deleteLocationFromBackendDB, {isLoading: isLoadingDeletingLocationFromDatabase}] = useDeleteUserLocationsMutation()
    const handleLocationDeletion = async () => {
        try {
            //send backend request
            //ids need not be a list, backend can still process the request 
            await deleteLocationFromBackendDB({username: user, ids: markedForDeletionList}).unwrap();

            //set application logic
            dispatch(deleteLocations({ids:markedForDeletionList}));

            //calling both in the same try block ensures server and frontend state sync

            setToolbarState(TOOLBAR_STATE.NONE);
        }
        catch (error) {
            console.log(error);
        }
    }

    const confirmDeletionButton = markedForDeletionList.length !== 0 ?
        <div className="confirm-location-delete alert-message" onClick={() => handleLocationDeletion()}>
            {markedForDeletionList.length === 1 ? <span>Confirm Remove Location</span> : <span>Confirm Remove {markedForDeletionList.length} locations</span>}
        </div>
        : <></>;

    useEffect(() => {
        setMarkedForDeletionList([]);
    }, [toolbarState])

    const handleLocationClick = (location) => {
        dispatch(setCurrentLocation({...location}));
        navigate('/location');
    }

    //if locations is being loaded still, just displaying loading text
    //otherwise if locations is empty, display text to tell the user to add a location
    //otherwise display all locations that the user has
    const renderedLocations = locations.length === 0 ?
            <div>Add a location to get started</div>
            : locations.map(location =>
                <LocationWidget
                    className="location"
                    key={location.id}
                    location={location}
                    toolbarState={toolbarState}
                    addLocationToMarkedForDeletionList={addLocationToMarkedForDeletionList}
                    removeLocationFromMarkedForDeletionList={removeLocationFromMarkedForDeletionList}
                    onClick={handleLocationClick}
                />)

    return (
        <div className="locationsMainPage">
            <div className="locationsContainer">
                {confirmDeletionButton}
                <div className="locationsOptionsArea border">
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