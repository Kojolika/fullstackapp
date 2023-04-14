import { Sunny, BrokenImg } from "../../Icons/svgImages/Weather Icons/index";


const WeatherIcon = (props) => {

    const id = props.id;

    const iconReference = {
        1: <Sunny height={props.height} width={props.width}/>,
        2: <Sunny height={props.height} width={props.width}/>,
        3: <Sunny height={props.height} width={props.width}/>,
        4: <Sunny height={props.height} width={props.width}/>,
    }

    const icon = iconReference[id] === null || id === null? <BrokenImg height={props.height} width={props.width} />: iconReference[id];
    
    return icon;
}
export default WeatherIcon