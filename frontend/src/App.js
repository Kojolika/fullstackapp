import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectCurrentUser, setCredentials } from './Features/auth/authSlice';
import { useLazyGetUserLocationsQuery } from './Features/locations/locationsApiSlice';
import { setUserLocations } from './Features/locations/locationsSlice';
import { setTheme, setTempUnit } from './Features/user_preferences/preferenceSlice';
import formatLocation from './data/utils/formatLocation';

import SearchLocation from './Components/Modules/SearchLocation';
import SettingsButton from './Components/Modules/SettingsButton';

import Locations from './Components/Pages/Locations';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Home from './Components/Pages/Home';
import LocationData from './Components/Pages/LocationData';


import { IconHome } from './Icons/svgImages/index';

import './Styles/app.css';
import { useRefreshAccessTokenMutation } from './Features/auth/authApiSlice';


function App() {
  const user = useSelector(selectCurrentUser);
  const [triggerRefreshAccess] = useRefreshAccessTokenMutation();
  //useLazyQuery hook allows manual fetching
  const [triggerGetLocations] = useLazyGetUserLocationsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const triggerRefreshAuth = async () => {
      try {
        const data = await triggerRefreshAccess({}).unwrap();
        const user = data.user;
        const accessToken = data.access_token;
        const csrfAccessToken = data.csrf_access_token;
        //log in user
        dispatch(setCredentials({ user, accessToken, csrfAccessToken }));

        //fetch user prefs if they exist
        const tempUnit = localStorage.getItem("temperatureUnit");
        const theme = localStorage.getItem("theme");
        if (tempUnit === 'Celcius' || tempUnit === 'Fahrenheit') {
          dispatch(setTempUnit({ "unit": tempUnit }));
        }
        if (theme === "Light" || theme === "Dark") {
          dispatch(setTheme({ "theme": theme }));
        }

        //get user locations from backend
        //and set user locations for application logic
        const fetchUserLocations = async () => {
          const payload = await triggerGetLocations({ 'username': user }, false).unwrap();
          const locationsFormattedCorrectly = [];
          payload?.locations.forEach(location => locationsFormattedCorrectly.push(formatLocation(location)));
          dispatch(setUserLocations({ "locations": locationsFormattedCorrectly }));
        }
        fetchUserLocations();
      }
      catch (err) {
        console.log(err);
      }
    }
    triggerRefreshAuth();

  }, [])

  const userGreeting = user ?
    (<div id="greeting">
      <span>Hello <b>{user}</b></span>
    </div>) :
    (
      <div id="greeting">
        <span>Hello <b>Guest</b></span>
      </div>)

  const favorites = user ? <div className="tabContainer">
    <Link to='/locations' className="tabName">My Favorites</Link>
  </div> : <></>

  const userSignIn = user ?
    (<div className="tabContainer">
      <SettingsButton />
    </div>) :
    (<div className="tabContainer">
      <Link to='/login' className="tabName">Login</Link>
    </div>)

  return (
    <Router>
      <div className='menuBar border' style={{ borderWidth: 0, borderRadius: 0 }}>
        <div id='left-positioned-menuBar-elements'>
          <div id='home-button' className='tabContainer'>
            <Link to='/'><IconHome /></Link>
          </div>
          <SearchLocation />
        </div>
        <div className="tabContainer">
          {userGreeting}
        </div>
        {favorites}
        {userSignIn}
      </div>

      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/locations' element={<Locations />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/location' element={<LocationData />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
