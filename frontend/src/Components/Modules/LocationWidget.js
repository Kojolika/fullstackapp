import '../../Styles/locations.css';
import '../../Styles/app.css';

import { useState, useEffect } from 'react';

import { ThreeDots, CheckBoxChecked, CheckBoxUnchecked } from '../../Icons/svgImages/index.js';

import { TOOLBAR_STATE } from '../Pages/Locations';

const LocationWidget = (props) => {

    const country = props.location.country.name;
    const province = props.location.province.name;
    const city = props.location.city.name;
    const latitude = props.location.latitude;
    const longitude = props.location.longitude;

    const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);
    const handleCheckBoxClick = () => {
        if (isMarkedForDeletion) {
            props.removeLocationFromMarkedForDeletionList(props.location.id)
        } else {
            props.addLocationToMarkedForDeletionList(props.location.id);
        }
        setIsMarkedForDeletion(!isMarkedForDeletion);
    }

    //reset to unmarked when leaving deleting state
    useEffect(() => {
        setIsMarkedForDeletion(false);
    }, [props.toolbarState])

    const icon = isMarkedForDeletion ? <CheckBoxChecked /> : <CheckBoxUnchecked />;
    const checkBox = props.toolbarState === TOOLBAR_STATE.DELETING ? <div className={isMarkedForDeletion ? "optionsButtons deletion-selected" : "optionsButtons"} onClick={() => handleCheckBoxClick()} >{icon}</div> : <></>

    const handleClick = () => {
        if (props.toolbarState === TOOLBAR_STATE.DELETING) {
            handleCheckBoxClick();
        }
        else {
            props.onClick(props.location);
        }
    }

    const location = <article className="location border" onClick={() => handleClick()}>
        <div className='checkbox-position'>
            {checkBox}
        </div>
        <h2>
            {city === null ? latitude : city}, {province === null ? longitude : province}
            <br />
            {country ? country : <></>}
        </h2>
    </article>

    return location;
}

export default LocationWidget