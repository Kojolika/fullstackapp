import { useSelector } from "react-redux";
import { selectTempUnit } from "../../Features/user_preferences/preferenceSlice";

const Temperature = (props) => {
    const { temperature, unit } = props.options;
    const currentTempUnit = useSelector(selectTempUnit);

    const convertToF = (temp) => Math.round((temp * 1.8) + 32);
    const convertToC = (temp) => Math.round((temp - 32) * (5 / 9));
    
    const finalDisplay = unit === currentTempUnit ? temperature 
    : currentTempUnit === "Celcius" ? convertToC(temperature) : convertToF(temperature);

    return finalDisplay;
}

export default Temperature