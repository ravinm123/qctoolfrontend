import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Signin = () => {
  const [formdata, setFormdata] = useState({
    email: '',
    password: ''
  });
  
  const navigate = useNavigate(); // Initialize useNavigate hook

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

      const { token } = response.data;
      localStorage.setItem('access_token', token);
      console.log('Login successful! Token:', token);
      
      // Redirect to the dashboard after login
      navigate('/dashboard'); // Ensure your route matches your routing setup
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
      <ToastContainer 
        className="toast-container" 
        position="top-center" 
        autoClose={5000} 
        hideProgressBar={false} 
        closeOnClick
        pauseOnHover
        draggable
        theme="light" 
      />
      <div className='login-box'>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className='input-box'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              value={email}
              onChange={handleOnChange}
              required // Add required for better UX
            />
          </div>
          <div className='input-box'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleOnChange}
              required // Add required for better UX
            />
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' /> Remember me
            </label>
          </div>
          <button type='submit' disabled={!email || !password}>Login</button>
          <div className='register-link'>
            {/* Uncomment and update if you have a registration route */}
            {/* <p>Don't have an account?</p>
            <a href='/register'>Register</a> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
