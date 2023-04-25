import { useState, useEffect } from "react";

const Time = (props) => {
    const [time, setTime] = useState(0);
    const [meridiem, setMeridiem] = useState('AM');


    useEffect(() => {
        
        //Assumption is that props.number is a string in the form 'HH:MM' where HH is the hour and MM is the minute and is in the UTC timezone
        const militaryHour = parseInt(props.number.slice(0, 2));
        
        //props.offset is the offset number (+ or -) that converts this time from the UTC timezone to the local time
        const offset = props.offset;

        const militaryHourWithMidnightConsistency = militaryHour === 24 ? 0 : militaryHour; 

        const afterOffsetHour = militaryHourWithMidnightConsistency + offset;

        const militaryLocalTime = afterOffsetHour > 24 ?  afterOffsetHour - 24 : afterOffsetHour < 0 ? afterOffsetHour + 24 : afterOffsetHour;

        if(militaryLocalTime > 11) {
            setMeridiem('PM')
        }
        else {
            setMeridiem('AM')
        }

        const regularLocalTime = militaryLocalTime <= 12 ? militaryLocalTime === 0 ? 12 : militaryLocalTime : militaryLocalTime - 12;

        setTime(regularLocalTime);
    }, [])


    return time + ' ' + meridiem;
}

export default Time