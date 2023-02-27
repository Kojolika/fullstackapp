import '../Styles/home.css';
import clouds from '../Media/clouds2.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='homeMainContainer'>
            <section className='imageObject'>
                <img className='image' src={clouds}></img>
                <div className='content'>
                    <p className='description'>A weather and pollution app, login, add locations to your list and view the forecast and polution.
                        <br />
                        Weather data is loaded from the AirVisual API.</p>
                    <Link to='/locations' className='getStartedButton'>
                        <button >
                            Get Started
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home;