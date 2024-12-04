import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Input from '../components/ui/Input';
import { getUsersFromStorage, getStaffFromStorage } from '../utils/storageUtils';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsersFromStorage();
    const staff = getStaffFromStorage();

  
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      if (user.role === 'Admin') navigate('/dashboard');
      else if (user.role === 'Moderator') navigate('/user-management');
      else if (user.role === 'Family') navigate('/family-management');
      window.location.reload();
      return;
    }

 
    const staffMember = staff.find(
      (s) => s.email === formData.email && s.password === formData.password
    );

    if (staffMember) {

      localStorage.setItem('loggedInUser', JSON.stringify(staffMember));
      navigate('/staff-management');
      window.location.reload();
      return;
    }


    setError('Invalid email or password');
  };

  return (
    <div className='login'>
      <div className='container'>

        <div className='form-container'>
          <h1>Welcome To Amble</h1>
          <p>A Comprehensive Solution to Simplify Building Operations and Streamline Building Management for a Modern Lifestyle</p>
          <form onSubmit={handleSubmit} className='login-form'>
            {error && <p className='error'>{error}</p>}
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              required
            />
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              required
            />
            <button type="submit" className='submit-button'>Login</button>
            <div className='social-login-container'>
              <p>or</p>
              <div className='social-login'>
                <div className='google-login'>
                  <FaGoogle />
                  Google
                </div>
                <div className='facebook-login'>
                  <FaFacebookF />
                  Facebook
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;
