import { useState, useEffect } from "react";

const Time = (props) => {

    const [meridiem, setMeridiem] = useState(''); //AM or PM
    const [time, setTime] = useState("1"); //time to be displayed


    useEffect(() => {

        //Assumption is that props.number is a string in the form 'HH:MM' where HH is the hour and MM is the minute
        const number = parseInt(props.number.slice(0, 2));

        //props.offset is the offset number (+ or -) that converts this time from the UTC timezone to the local time
        const afterOffset = number + props.offset;

        //convert from military time on initial render 
        if ( (afterOffset <= 23 && afterOffset >= 12) || afterOffset < 0) setMeridiem('PM');
        else setMeridiem('AM');

        const finaltime = afterOffset < 0 ? (afterOffset + 12) % 12 : afterOffset % 12;
        
        const zeroCheck = finaltime === 0 ? 12 : finaltime;

        setTime(zeroCheck);

    }, [])

    return time + ' ' + meridiem;
}

export default Time