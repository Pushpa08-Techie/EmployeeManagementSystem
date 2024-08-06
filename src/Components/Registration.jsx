// src/Components/Registration.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    if (username) {
      navigate('/home'); // Redirect to home if the user is already logged in
    }
  }, [navigate]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...'
  };

  const validateField = (name, value) => {
    let validationErrors = { ...errors };

    switch (name) {
      case 'firstName':
        if (value.length < 5) {
          validationErrors.firstName = "First name should be minimum 5 characters";
        } else if (value.length > 15) {
          validationErrors.firstName = "First name should be maximum 15 characters";
        } else {
          delete validationErrors.firstName;
        }
        break;

      case 'lastName':
        if (value.length < 5) {
          validationErrors.lastName = "Last name should be minimum 5 characters";
        } else if (value.length > 15) {
          validationErrors.lastName = "Last name should be maximum 15 characters";
        } else {
          delete validationErrors.lastName;
        }
        break;

      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          validationErrors.email = "Email not valid";
        } else {
          delete validationErrors.email;
        }
        break;

      case 'password':
        if (value.length < 6) {
          validationErrors.password = "Password length must be at least 6 characters";
        } else {
          delete validationErrors.password;
        }
        break;

      case 'cpassword':
        if (value !== formData.password) {
          validationErrors.cpassword = "Passwords do not match";
        } else {
          delete validationErrors.cpassword;
        }
        break;

      default:
        break;
    }

    setErrors(validationErrors);
    setValid(Object.keys(validationErrors).length === 0);
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    // Validate all fields
    for (const field in formData) {
      validateField(field, formData[field]);
      if (errors[field]) {
        isValid = false;
        validationErrors[field] = errors[field];
      }
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      axios.post('http://localhost:8080/api/employees', formData, { headers })
        .then(() => {
          alert("Registered Successfully");
          navigate('/login');
        })
        .catch(err => alert(err));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const toggleStyle = {
    cursor: 'pointer',
    position: 'absolute',
    right: '12px',
    top: '27%'
  };

  return (
    <div className="container col-md-7 offset-md-1">
      <div className="row">
        <div className="col md-8 offset-md-5 ">
          <div className="signup-form">
            <form className="mt-5 border p-4 bg-light shadow" onSubmit={handleSubmit}>
              <h4 className="text-center md-5 text-secondary">Create Your Account</h4>

              <div className="row">
                {/* First Name */}
                <div className="mb-3 col-md-12">
                  <label>
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    placeholder="Enter your First Name"
                    onChange={handleTextChange}
                  />
                  {!valid && <span className="text-danger">{errors.firstName}</span>}
                </div>
                {/* Last Name */}
                <div className="mb-3 col-md-12">
                  <label>
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    placeholder="Enter your Last Name"
                    onChange={handleTextChange}
                  />
                  {!valid && <span className="text-danger">{errors.lastName}</span>}
                </div>
                {/* Email */}
                <div className="mb-3 col-md-12">
                  <label>
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={handleTextChange}
                  />
                  {!valid && <span className="text-danger">{errors.email}</span>}
                </div>
                {/* Password */}
                <div className="mb-3 col-md-12">
                  <label>
                    Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={handleTextChange}
                    />
                    <span
                      style={toggleStyle}
                      className="togglePassword"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                  </div>
                  {!valid && <span className="text-danger">{errors.password}</span>}
                </div>
                {/* Confirm Password */}
                <div className="mb-3 col-md-12">
                  <label>
                    Confirm Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showCPassword ? 'text' : 'password'}
                      name="cpassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={handleTextChange}
                    />
                    <span
                      style={toggleStyle}
                      className="togglePassword"
                      onClick={toggleCPasswordVisibility}
                    >
                      <FontAwesomeIcon icon={showCPassword ? faEye : faEyeSlash} />
                    </span>
                  </div>
                  {!valid && <span className="text-danger">{errors.cpassword}</span>}
                </div>
                {/* Sign Up Button */}
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary float-end">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-3">
              <p className="text-center">
                Already registered? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
