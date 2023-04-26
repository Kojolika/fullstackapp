import { Settings, ToggleOff, ToggleOn } from "../../Icons/svgImages/index";
import { logOut } from "../../Features/auth/authSlice";
import { selectTempUnit, selectTheme, setTempUnit, setTheme } from "../../Features/user_preferences/preferenceSlice";
import { useLogoutAccessMutation, useLogoutRefreshMutation } from "../../Features/auth/authApiSlice";

import useOutsideClick from "../../app/hooks/useOutsideClick";
import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import '../../Styles/settings.css';
import { setUserLocations } from "../../Features/locations/locationsSlice";

const SettingsButton = () => {

    const dispatch = useDispatch();
    const [logoutAccess] = useLogoutAccessMutation();
    const [logoutRefresh] = useLogoutRefreshMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [degreeUnit, setDegreeUnit] = useState();
    const [themeSetting, setThemeSetting] = useState();
    const settingsDropDownRef = useRef();

    const temp = useSelector(selectTempUnit);
    const theme = useSelector(selectTheme);

    const navigate = useNavigate();

    useEffect(() => {
        setDegreeUnit(temp);
        setThemeSetting(theme);
    }, [])

    useEffect(() => {
        dispatch(setTempUnit({ "unit": degreeUnit }));
    }, [degreeUnit])

    useEffect(() => {
        dispatch(setTheme({ "theme": themeSetting }));
    }, [themeSetting])

    const handleLogout = async () => {
        try {
            const response = await logoutAccess({}).unwrap();
            try{
                const response = await logoutRefresh({}).unwrap();
            }
            catch(err){
                console.log(err);
            } 
            dispatch(logOut());
            dispatch(setUserLocations([]));
            navigate('/');
        }
        catch (err) {
            console.log(err);
            console.log("something went wrong");
        }
    }
    const toggleOpen = () => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    }

    const handleClickTemp = () => {
        if (degreeUnit === "Celcius") {
            setDegreeUnit("Fahrenheit");
        }
        else {
            setDegreeUnit("Celcius");
        }
    }
    const handleClickTheme = () => {
        if (themeSetting === "Light") {
            setThemeSetting("Dark");
        }
        else {
            setThemeSetting("Light");
        }
    }

    useOutsideClick(settingsDropDownRef, () => {
        setIsOpen(false);
    })

    const dropDown = isOpen ?
        <div className="settings-drop-down border" >
            <div className="settings-drop-down-option">
                ° Unit: {temp}
                <div className="icon-button" onClick={() => handleClickTemp()}>
                    <div className="no-pointer-events">{degreeUnit === "Celcius" ? <ToggleOn /> : <ToggleOff />}</div>
                </div>
            </div>
            <div className="settings-drop-down-option">
                Theme: {theme}
                <div className="icon-button" onClick={() => handleClickTheme()}>
                    <div className="no-pointer-events">{themeSetting === "Light" ? <ToggleOn /> : <ToggleOff />}</div>
                </div>
            </div>
            <div className="settings-drop-down-option icon-button" onClick={() => handleLogout()} >Logout</div>
        </div>
        : <></>

    return (
        <div ref={settingsDropDownRef}>
            <Settings onClick={toggleOpen} className="settings-icon" />
            {dropDown}
        </div>
    )
}
export default SettingsButton