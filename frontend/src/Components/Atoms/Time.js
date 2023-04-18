import { useState, useEffect } from "react";

const Time = (props) => {

    const [meridiem, setMeridiem] = useState('AM'); //AM or PM
    const [time, setTime] = useState("1"); //time to be displayed


    useEffect(() => {

        //Assumption is that props.number is a string in the form 'HH:MM' where HH is the hour and MM is the minute
        const militaryHour = parseInt(props.number.slice(0, 2));

        const regularHour = militaryHour > 12 ? () =>{
            setMeridiem('PM');
            return militaryHour - 12
        } : () =>{
            setMeridiem('AM');
            if(militaryHour === 0 ) return 12
            else return militaryHour
        };

        //props.offset is the offset number (+ or -) that converts this time from the UTC timezone to the local time
        const afterOffset = regularHour + props.offset;

        

        setTime(regularHour);

    }, [])

    return time + ' ' + meridiem;
}

export default Time