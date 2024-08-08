import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context/globalcontext';
import axiosInstance from "../utils/axiosinstance";
function SignIn() {
  const { error, setError } = useGlobalContext();
  const navigate = useNavigate();
  const loginAccount = async (input) => {
    try {
      const response = await axiosInstance.post('/signin', input);
      console.log('Logged in successfully:', response.data);

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate('/home');
        // navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error details:', err.message);
    }
    // await getAccount();
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form data submitted:', formData);
      loginAccount(formData);

      // setErrors({});
      // Here, you would typically handle form submission (e.g., send data to server)
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <SignInStyled>
      <div className="signup-container">
        {error && <p className='error'>{error}</p>}
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Sign In</button>
        </form>
        <p className="signup-link">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </SignInStyled>
  );
}

const SignInStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7f9, #e1e5e9);

  .signup-container {
    max-width: 450px;
    width: 100%;
    padding: 2.5rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    text-align: center;
    border: 1px solid #e2e2e2;

    h2 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #555;
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s;

        &::placeholder {
          color: #aaa;
        }

        &:focus {
          border-color: #007bff;
        }
      }

      .error {
        color: #ff4d4f;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      }
    }

    button {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      background-color: #007bff;
      color: white;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.2s;
      
      &:hover {
        background-color: #0056b3;
        transform: scale(1.02);
      }
    }

    .signup-link {
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #555;

      a {
        color: #007bff;
        text-decoration: none;
        transition: color 0.3s;

        &:hover {
          color: #0056b3;
        }
      }
    }
  }
`;

export default SignIn;
