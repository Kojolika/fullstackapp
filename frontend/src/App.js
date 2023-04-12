import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import { useSelector, } from 'react-redux';
import { selectCurrentUser } from './Features/auth/authSlice';
import SearchLocation from './Components/Atoms/SearchLocation';
import SettingsButton from './Components/Atoms/SettingsButton';

import Locations from './Components/Pages/Locations';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Home from './Components/Pages/Home';
import LocationData from './Components/Pages/LocationData';

import { IconHome } from './Icons/svgImages/index';


import './Styles/app.css';


function App() {
  const user = useSelector(selectCurrentUser);

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
      <div className='menuBar border' style={{ borderWidth: 0 }}>
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
      <div className='menuBarFill'></div>

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
