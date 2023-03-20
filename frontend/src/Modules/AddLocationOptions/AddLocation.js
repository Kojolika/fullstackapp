import '../../Styles/addLocation.css'

const AddLocation = (props) => {

  return (
    <div className="addLocationMoodle">
      <button className='addLocationButton'>Use my current location</button>
      <br/>
      <button className='addLocationButton'>Add by country/state/city</button>
      <br/>
      <button className='addLocationButton'>Add by coordinates</button>
      <br/>
      <button className='addLocationBackButton' onClick={() => props.onClose()}>Close</button>
    </div>
  )
}

export default AddLocation