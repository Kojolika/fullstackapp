import { useState, useEffect } from "react";

const Time = (props) => {

    let meridiem = 'AM'; //AM or PM
    let time = 1;

    const [finalTime, setFinalTime] = useState(time);
    const [finalMeridiem, setFinalMeridiem] = useState('AM');

    const swapMeridiemValue = () => {
        if (meridiem === 'AM'){
            meridiem ='PM';
        } 
        else {
            meridiem ='AM';
        }
    }


    useEffect(() => {

        //Assumption is that props.number is a string in the form 'HH:MM' where HH is the hour and MM is the minute and is in the UTC timezone
        const militaryHour = parseInt(props.number.slice(0, 2));

        const regularHour = () => {
            if (militaryHour > 12) {
                meridiem ='PM';
                return militaryHour - 12;
            } else {
                if (militaryHour === 12) {
                    meridiem ='PM';
                    return militaryHour;
                }
                else if (militaryHour === 0) {
                    meridiem ='AM';
                    return 12;
                }
                else {
                    meridiem ='AM';
                    return militaryHour;
                }
            }
        }

        const regularHourUTC = regularHour();

        //props.offset is the offset number (+ or -) that converts this time from the UTC timezone to the local time
        const offset = props.offset;
        const afterOffsetHour = regularHourUTC + offset;

        if (offset === 12 || offset === -12) {
            swapMeridiemValue()
            time = regularHourUTC();

        } else { //offset < 12 || offset > -12

            if (afterOffsetHour > 12) {
                swapMeridiemValue();
                time = afterOffsetHour - 12;
            }
            else if(afterOffsetHour == 0){
                time = 12 + afterOffsetHour;
            }
            else if (afterOffsetHour < 0) {
                swapMeridiemValue();
                time = 12 + afterOffsetHour;
            }
            else {
                time = afterOffsetHour;
            }
        }
        setFinalTime(time);
        setFinalMeridiem(meridiem);
    }, [])

    
    return finalTime + ' ' + finalMeridiem;
}

export default Time