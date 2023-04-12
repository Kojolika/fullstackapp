import { Settings, ToggleOff, ToggleOn } from "../../Icons/svgImages/index";
import { logOut, selectCurrentToken } from "../../Features/auth/authSlice";
import { selectTempUnit, selectTheme, setTempUnit, setTheme } from "../../Features/user_preferences/preferenceSlice";
import { useLogoutMutation } from "../../Features/auth/authApiSlice";

import { useSelector, useDispatch } from "react-redux";

import { useEffect, useState } from "react";

import '../../Styles/settings.css';

const SettingsButton = () => {

    const accessToken = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [degreeUnit, setDegreeUnit] = useState();
    const [themeSetting, setThemeSetting] = useState();

    const temp = useSelector(selectTempUnit);
    const theme = useSelector(selectTheme);

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
            const message = await logout({ accessToken }).unwrap();
            dispatch(logOut());
            console.log(message);
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
    const tempToggleIcon = degreeUnit === "Celcius" ? <ToggleOn /> : <ToggleOff />;
    const themeToggleIcon = themeSetting === "Light" ? <ToggleOn /> : <ToggleOff />;

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

    const dropDown = isOpen ? <div className="settings-drop-down border">
        <div className="settings-drop-down-option"  >
            ° Unit: {temp}
            <div className="icon-button" onClick={() => handleClickTemp()}>{tempToggleIcon}</div>
        </div>
        <div className="settings-drop-down-option" >
            Theme: {theme}
            <div className="icon-button" onClick={() => handleClickTheme()}>
                {themeToggleIcon}
            </div>
        </div>
        <div className="settings-drop-down-option icon-button" onClick={() => handleLogout()} >Logout</div>
    </div> : <></>


    return <div>
        <Settings onClick={toggleOpen} className="settings-icon" />
        {dropDown}
    </div>
}
export default SettingsButton