import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../utils/axiosinstance";
import { useGlobalContext } from '../context/globalcontext';
function Signup() {
  const { error, setError } = useGlobalContext();
  const navigate = useNavigate();
  const createAccount = async (input) => {
    try {
      const response = await axiosInstance.post('/signup', input);
      console.log('Account created successfully:', response.data);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error details:', err.message);
    }
    navigate('/');
    // await getAccount();
  };

  const [formData, setFormData] = useState({
    name: '',
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
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form data submitted:', formData);
      createAccount(formData);

      // Here, you would typically handle form submission (e.g., send data to server)
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <SignupStyled>
      <div className="signup-container">
        {error && <p className='error'>{error}</p>}
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </SignupStyled>
  );
}

const SignupStyled = styled.div`
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
  }
`;

export default Signup;
