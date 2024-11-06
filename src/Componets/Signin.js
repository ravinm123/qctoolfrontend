import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './login.css';
import myImage from './page/pic1.png';
import mylog from './page/pic3.png';

const Signin = () => {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const { email, password } = formdata;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post('http://127.0.0.1:8000/login/', {
            email,
            password
        });

        const { token, user } = response.data;

        // Store access and refresh tokens
        localStorage.setItem('access_token', token?.access_token);
        localStorage.setItem('refresh_token', token?.refresh_token);

        // Store username and role in localStorage
        localStorage.setItem('user', JSON.stringify({
            username: user.username,
            role: user.role // Store role as well
        }));

        // Show success toast message
        toast.success('Login successful! Welcome back!');

        console.log('Login successful! Token:', token, 'User:', user);
        
        // Delay navigation to allow the toast to be visible
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000); // Navigate after 3 seconds

    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message || 'Login failed.');
        } else {
            toast.error('An unexpected error occurred. Please try again later.');
        }
        console.error('Login error:', error);
    } 
};


  return (
    <div className='wrapper'>
      <div className="image-container">
        <img src={myImage} alt="Illustration" />
      </div>
      <div className='login-box'>
        <div className="logo">
          <img src={mylog} alt='Logo' />
        </div>
        <h2>Welcome To ASPL QC Tool</h2>
        <p className="greeting">It's nice to see you again! 👋<br/>Log in to continue to your account.</p>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <input
              type='text'
              placeholder='User name'
              name='email'
              value={email}
              onChange={handleOnChange}
            />
          </div>
          <div className='input-box-2'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <div className='options'>
            <label>
              <input type='checkbox' /> Remember me
            </label>
            <a href='/' className='forgot-password'>Forget password</a>
          </div>
          <button type='submit' disabled={!email || !password}>Login</button>
        </form>
        <footer>&copy;ASPL. All rights</footer>
      </div>
      <ToastContainer 
          className="toast-container" 
          position="top-center" 
          autoClose={4000} 
          hideProgressBar={false} 
          closeOnClick
          pauseOnHover
          draggable
          theme="light" 
      />  
    </div>
  );
};

export default Signin;
