import { useEffect, useState } from "react";
import { Info, North } from "../../Icons/svgImages/index";
import ToolTip from "./ToolTip";

import '../../Styles/app.css';

const BEAUFORT_WIND_SCALE = {
    0: {
        Description: 'Calm',
        Specification: 'Calm; smoke rises vertically.'
    },
    1: {
        Description: 'Light Air',
        Specification: 'Direction of wind shown by smoke drift, but not by wind vanes.'
    },
    2: {
        Description: 'Light Breeze',
        Specification: 'Wind felt on face; leaves rustle; ordinary vanes moved by wind.'
    },
    3: {
        Description: 'Gentle Breeze',
        Specification: 'Leaves and small twigs in constant motion; wind extends light flag.'
    },
    4: {
        Description: 'Moderate Breeze',
        Specification: 'Raises dust and loose paper; small branches are moved.'
    },
    5: {
        Description: 'Fresh Breeze',
        Specification: 'Small trees in leaf begin to sway; crested wavelets form on inland waters.'
    },
    6: {
        Description: 'Strong Breeze',
        Specification: 'Large branches in motion; whistling heard in telegraph wires; umbrellas used with difficulty.'
    },
    7: {
        Description: 'Near Gale',
        Specification: 'Whole trees in motion; inconvenience felt when walking against the wind.'
    },
    8: {
        Description: 'Gale',
        Specification: 'Breaks twigs off trees; generally impedes progress.'
    },
    9: {
        Description: 'Severe Gale',
        Specification: 'Slight structural damage occurs (chimney-pots and slates removed)'
    },
    10: {
        Description: 'Storm',
        Specification: 'Seldom experienced inland; trees uprooted; considerable structural damage occurs.'
    },
    11: {
        Description: 'Violent Storm',
        Specification: 'Very rarely experienced; accompanied by wide-spread damage'
    },
    12: {
        Description: 'Hurricane',
        Specification: 'See Saffir-Simpson Hurricane Scale'
    }


}

const Wind = (props) => {
    const windDirection = props.windDirection;
    const speed = props.speed;
    const speedInMilesPerHour = Math.round(speed / 0.44704);

    const [windScale, setWindScale] = useState(0);

    useEffect(() => {
        switch (true) {
            case (speedInMilesPerHour >= 0 && speedInMilesPerHour < 1):
                setWindScale(0);
                break;
            case (speedInMilesPerHour >= 1 && speedInMilesPerHour < 4):
                setWindScale(1);
                break;
            case (speedInMilesPerHour >= 4 && speedInMilesPerHour < 8):
                setWindScale(2);
                break;
            case (speedInMilesPerHour >= 8 && speedInMilesPerHour < 13):
                setWindScale(3);
                break;
            case (speedInMilesPerHour >= 13 && speedInMilesPerHour < 19):
                setWindScale(4);
                break;
            case (speedInMilesPerHour >= 19 && speedInMilesPerHour < 25):
                setWindScale(5);
                break;
            case (speedInMilesPerHour >= 25 && speedInMilesPerHour < 31):
                setWindScale(6);
                break;
            case (speedInMilesPerHour >= 32 && speedInMilesPerHour < 39):
                setWindScale(7);
                break;
            case (speedInMilesPerHour >= 39 && speedInMilesPerHour < 47):
                setWindScale(8);
                break;
            case (speedInMilesPerHour >= 47 && speedInMilesPerHour < 55):
                setWindScale(9);
                break;
            case (speedInMilesPerHour >= 55 && speedInMilesPerHour < 64):
                setWindScale(10);
                break;
            case (speedInMilesPerHour >= 64 && speedInMilesPerHour < 73):
                setWindScale(11);
                break;
            case (speedInMilesPerHour >= 73):
                setWindScale(12);
                break;
        }
    }, [])

    const text = BEAUFORT_WIND_SCALE[windScale].Specification;
    const info = <Info height={16} width={16} />

    return (
        <div className="flex-column flex-center-align">
            <div className="flex-center-align flex-row" style={{gap: '3px'}}>
                <label htmlFor="wind-speed">Wind</label> <ToolTip label={BEAUFORT_WIND_SCALE[windScale].Description} text={text} item={info} />
            </div>
            <div className="flex-row flex-center-align">{speedInMilesPerHour} mph <North rotateDegree={windDirection} height={16} width={16} /></div>
        </div>
    )
}

export default Wind