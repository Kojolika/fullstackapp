import { useState, useEffect } from "react";
import '../../Styles/app.css';
import '../../Styles/airQuality.css';

import ToolTip from "./ToolTip";

const LevelsOfConcern = {
    GOOD: {
        name: 'Good',
        text: 'Air quality is satisfactory, and air pollution poses little or no risk.'
    },
    MODERATE: {
        name: 'Moderate',
        text: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
    },
    UNHEALTHY_FOR_SENSITIVE_GROUPS: {
        name: 'Unhealthy for Sensitive Groups',
        text: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
    },
    UNHEALTHY: {
        name: 'Unhealthy',
        text: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
    },
    VERY_UNHEALTHY: {
        name: 'Very Unhealthy',
        text: 'Health alert: The risk of health effects is increased for everyone.'
    },
    HAZARDOUS: {
        name: 'Hazardous',
        text: 'Health warning of emergency conditions: everyone is more likely to be affected.'
    }
}

const AirQuality = (props) => {

    const [levelOfConcern, setLevelOfConcern] = useState('');

    useEffect(() => {
        const number = props.number;
        console.log(number);
        switch (true) {
            case (number >= 0 && number <= 50):
                setLevelOfConcern(LevelsOfConcern.GOOD);
                break;
            case (number > 50 && number <= 100):
                setLevelOfConcern(LevelsOfConcern.MODERATE);
                break;
            case (number > 100 && number <= 150):
                setLevelOfConcern(LevelsOfConcern.UNHEALTHY_FOR_SENSITIVE_GROUPS);
                break;
            case (number > 150 && number <= 200):
                setLevelOfConcern(LevelsOfConcern.UNHEALTHY);
                break;
            case (number > 200 && number <= 300):
                setLevelOfConcern(LevelsOfConcern.VERY_UNHEALTHY);
                break;
            case (number > 300):
                setLevelOfConcern(LevelsOfConcern.HAZARDOUS);
                break;
            default:
                break;
        }

    }, [])
    const color = levelOfConcern === LevelsOfConcern.GOOD ? "green"
        : levelOfConcern === LevelsOfConcern.MODERATE ? "yellow"
            : levelOfConcern === LevelsOfConcern.UNHEALTHY_FOR_SENSITIVE_GROUPS ? "orange"
                : levelOfConcern === LevelsOfConcern.UNHEALTHY ? "red"
                    : levelOfConcern === LevelsOfConcern.VERY_UNHEALTHY ? "purple"
                        : levelOfConcern === LevelsOfConcern.HAZARDOUS ? "maroon"
                            : ""

    const colorDisplay = <div className="color-display" id={color}></div>

    const text = levelOfConcern.text;

    return (
        <div className="flex-column flex-center-align">
            <div className="flex-row flex-center-align">{props.number}<ToolTip text={text} item={colorDisplay} /></div>
            <div id="AQI-label" className={levelOfConcern === LevelsOfConcern.UNHEALTHY_FOR_SENSITIVE_GROUPS ? "smaller-font" : ""}>{levelOfConcern.name} </div>
        </div>
    )
}

export default AirQuality