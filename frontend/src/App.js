import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import { logOut, selectCurrentUser, selectCurrentToken } from './Features/auth/authSlice';
import { useLogoutMutation } from './Features/auth/authApiSlice';
import SearchLocation from './Components/Atoms/SearchLocation';

import Locations from './Components/Pages/Locations';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Home from './Components/Pages/Home';
import LocationData from './Components/Pages/LocationData';

import './Styles/app.css';


function App() {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

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

  const userGreeting = user ?
    (<div id="greeting">
      <span>Hello {user}</span>
    </div>) :
    (
      <div id="greeting">
        <span>Hello Guest</span>
      </div>)


  const userSignIn = user ?
    (<div className="tabContainer">
      <span id="logout" onClick={() => handleLogout()} className="tabName">Logout</span>
    </div>) :
    (<div className="tabContainer">
      <Link to='/login' className="tabName">Login</Link>
    </div>)

  return (
    <Router>
      <div className='menuBar border' style={{ borderWidth: 0 }}>
        <div id='left-positioned-menuBar-elements'>
          <SearchLocation />
          {userGreeting}
        </div>
        <div className="tabContainer">
          <Link to='/' className="tabName">Home</Link>
        </div>
        <div className="tabContainer">
          <Link to='/locations' className="tabName">Locations</Link>
        </div>
        {userSignIn}
      </div>
      <div className='menuBarFill'></div>

      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/locations' element={<Locations />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/location' element={<LocationData/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
