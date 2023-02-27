import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../Features/auth/authSlice';

import { useRegisterMutation } from '../Features/auth/authApiSlice';

import '../Styles/login.css';

import { Link } from 'react-router-dom';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();
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
            if(pwd != confirmPwd) throw new Error("Password is not the same!");
            
            const userData = await register({ 'username': user, 'password': pwd }).unwrap();
            const accessToken = userData.access_token;
            dispatch(setCredentials({ user, accessToken }));
            setUser('');
            setPwd('');
            navigate('/locations')
            
            console.log("Success")
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 409){
                setErrMsg('Username already exists.');
            }
            else {
                setErrMsg(err);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handlePwdConfirmInput = (e) => setPwd(e.target.value);

    const content = isLoading ? <h1 className='login'>loading...</h1> : (
        <section className='login'>
            <p ref={errRef} className={errMsg != '' ? "errmsg" : "offscreen"}> {errMsg}</p>

            <h1>Register</h1>

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
                <label htmlFor='confirmPassw