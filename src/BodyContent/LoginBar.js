import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './LoginBar.css';

export default function LoginBar() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password
        };

        axios.post('https://dencelclinic.onrender.com/api/auth/login', data)
            .then((response) => {
                console.log(response.data);
                // Thực hiện các hành động khác sau khi đăng nhập thành công
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again later.');
                }
            });
    };

    const handleGoogleLoginSuccess = (response) => {
        // Xử lý thành công khi đăng nhập bằng tài khoản Google
        // Gửi thông tin đăng nhập thành công lên server hoặc thực hiện hành động khác
        console.log(response);
    };

    const handleGoogleLoginFailure = (error) => {
        // Xử lý khi đăng nhập bằng tài khoản Google thất bại
        console.log(error);
    };

    return (
        <div className='background'>
            <div className='shape'></div>
            <div className='shape'></div>

            <form className='login-form' onSubmit={handleSubmit}>
                <h3>Login Here</h3>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        placeholder='Email'
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                {errorMessage && <p className='error-message'>{errorMessage}</p>}

                <button type='submit'>Log In</button>

                <div className='login-links'>
                    <a href="/register">Register</a>
                    <a href="/forgot-password">Forgot Password</a>
                </div>

                <div className='social'>

                    <GoogleLogin
                        clientId='YOUR_GOOGLE_CLIENT_ID'
                        buttonText='Google'
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                    />


                </div>
            </form>
        </div>
    );
}
