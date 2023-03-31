import '../../Styles/locations.css';
import '../../Styles/app.css';

import { useState, useEffect } from 'react';

import { ThreeDots, CheckBoxChecked, CheckBoxUnchecked } from '../../Icons/svgImages/index.js';

import { TOOLBAR_STATE } from '../Pages/Locations';

const Location = (props) => {

    const country = props.country ? props.country : null;
    const province = props.province ? props.province : null;
    const city = props.city ? props.city : null;
    const latitude = props.latitude ? props.latitude : null;
    const longitude = props.longitude ? props.longitude : null;

    const [isMarkedForDeletion, setIsMarkedForDeletion] = useState(false);
    const handleCheckBoxClick = () =>{
        if(isMarkedForDeletion){
            props.removeLocationFromMarkedForDeletionList(props.location_id)
        }else{
            props.addLocationToMarkedForDeletionList(props.location_id);
        }
        setIsMarkedForDeletion(!isMarkedForDeletion);
    }
    
    //reset to unmarked when leaving deleting state
    useEffect(()=>{
        setIsMarkedForDeletion(false);
    },[props.toolbarState])
    
    const icon = isMarkedForDeletion ? <CheckBoxChecked/> : <CheckBoxUnchecked />;
    const checkBox = props.toolbarState === TOOLBAR_STATE.DELETING ? <div className={isMarkedForDeletion? "optionsButtons deletion-selected" : "optionsButtons"} onClick={() => handleCheckBoxClick()} >{icon}</div> : <></>
    
    const location = <article className="location border" >
        <div className='checkbox-position'>
            {checkBox}
        </div>
        <div className='iconOptions optionsButtons'>
            <ThreeDots/>
        </div>
        <h2>
            {city === null ? latitude : city}, {province === null ? longitude : province}
            <br/>
            {country ? country : <></>}
        </h2>
    </article>

    return location;
}

export default Location