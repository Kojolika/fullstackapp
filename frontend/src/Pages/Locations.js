import { useSelector } from "react-redux";
import { selectAllLocations } from "../Features/locations/locationsSlice";

import '../Styles/locations.css';

const Locations = () =>
{
    const locations = useSelector(selectAllLocations);

    const renderedLocations = locations.map(location =>
        <article className="location" key = {location.city}>
            <h3>{location.city}, {location.province}</h3>
        </article>
    )

    return(
        <div className="locationsMainPage">
            {renderedLocations}
            {/* syntax for showing data from backend //data ? data.members : <p>Loading...</p>*/}
        </div>
    )
}

export default Locations;