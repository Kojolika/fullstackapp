import '../../Styles/addLocation.css';
import { useState } from 'react'

import AddLocationManual from './AddLocationManual';
import AddLocationCoordinates from './AddLocationCoordinates';
import AddLocationCurrentLocation from './AddLocationCurrentLocation';


const AddLocation = (props) => {

  const [addLocationManualMenu, setAddLocationManualMenu] = useState(false);
  const [addLocationCoordinatesMenu, setAddLocationCoordinatesMenu] = useState(false);
  const [addLocationCurrentLocationMenu, setAddLocationCurrentLocationMenu] = useState(false);
  const [addLocationOptionsMenu, setAddLocationOptionsMenu] = useState(true);

  //could refactor to a single function in the future
  //may need ability to get react component type ?
  const toggleCloseManual = () => {
    if (addLocationManualMenu === false) {
      setAddLocationManualMenu(true);
      setAddLocationOptionsMenu(false)
    }
    else {
      setAddLocationManualMenu(false);
      setAddLocationOptionsMenu(true);
    }
  }

  const toggleCloseCoordinates = () => {
    if (addLocationCoordinatesMenu === false) {
      setAddLocationCoordinatesMenu(true);
      setAddLocationOptionsMenu(false)

    }
    else {
      setAddLocationCoordinatesMenu(false);
      setAddLocationOptionsMenu(true);
    }
  }

  const toggleCloseCurrentLocation = () => {
    if (addLocationCurrentLocationMenu === false) {
      setAddLocationCurrentLocationMenu(true);
      setAddLocationOptionsMenu(false);
    }
    else {
      setAddLocationCurrentLocationMenu(false);
      setAddLocationOptionsMenu(true);
    }
  }

  const manualMenuJSX = addLocationManualMenu ? <AddLocationManual reloadData={props.reloadData} toggleClose={toggleCloseManual} toggleMoodleClose={props.toggleClose} /> : <></>;
  const coordinatesMenuJSX = addLocationCoordinatesMenu ? <AddLocationCoordinates toggleClose={toggleCloseCoordinates} /> : <></>;
  const currentLocationMenuJSX = addLocationCurrentLocationMenu ? <AddLocationCurrentLocation toggleClose={toggleCloseCurrentLocation} /> : <></>;

  const addLocationOptionsButtons = addLocationOptionsMenu ?
    <div>
      <button className='addLocationButton' onClick={() => toggleCloseCurrentLocation()}>Use my current location</button>
      <br />
      <button className='addLocationButton' onClick={() => toggleCloseManual()}>Add by country/state/city</button>
      <br />
      <button className='addLocationButton' onClick={() => toggleCloseCoordinates()}>Add by coordinates</button>
      <br />
      <button className='addLocationBackButton' onClick={() => props.toggleClose()}>Close</button>
    </div>
    : <></>;

  return (
    <div className="addLocationMoodle border">
      <span className='title-spacing'>Add a Location</span>
      {addLocationOptionsButtons}
      {manualMenuJSX}
      {coordinatesMenuJSX}
      {currentLocationMenuJSX}
    </div>
  )
}

export default AddLocation