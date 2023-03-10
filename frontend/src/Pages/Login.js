import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../Features/auth/authSlice';
import { useLoginMutation } from '../Features/auth/authApiSlice';

import '../Styles/login.css';


const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    //login is the trigger function for the mutation hook
    //for more info on the return of useLoginMutation(): 
    //https://redux-toolkit.js.org/rtk-query/usage/mutations#frequently-used-mutation-hook-return-values
    //(remember useLoginMutation is auto generated by RTK Query from 'login' endpoint)
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ 'username': user, 'password': pwd }).unwrap();
            const accessToken = userData.access_token;
            dispatch(setCredentials({ user, accessToken }));
            setUser('');
            setPwd('');
            navigate('/locations')

        }
        catch (err) {
            if (err?.data?.message) {
                setErrMsg(err.data.message);
            }else {
                setErrMsg('No server response.');
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    const content = isLoading ? <h1 className='login'>loading...</h1> : (
        <section className='login'>
            <p ref={errRef} className={errMsg !== '' ? "errmsg" : "offscreen"}> {errMsg}</p>

            <h1>Login</h1>

            <form className='loginForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <span>Dont have an account? <Link to='/register'>Register now.</Link></span>
        </section>
    )

    return content;
}

export default Login;