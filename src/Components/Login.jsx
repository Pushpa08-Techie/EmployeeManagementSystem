import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    // Validate email
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email not valid";
    }

    // Validate password
    if (!formData.password || formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password not valid";
    }

    setErrors(validationErrors);

    if (isValid) {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
        const users = response.data;
        const user = users.find((user) => user.email === formData.email);

        if (user) {
          if (user.password === formData.password) {
            alert("Login successfully");
            sessionStorage.setItem('username', user.username);
            navigate("/home");
          } else {
            setErrors({ password: "Wrong password" });
          }
        } else {
          setErrors({ email: "User not found" });
        }
      } catch (error) {
        setErrors({ email: "Error logging in. Please try again later." });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleStyle = {
    cursor: "pointer",
    position: "absolute",
    right: "12px",
    top: "27%",
  };

  return (
    <div className="container col-md-10 offset-md-11">
      <div className="row">
        <div className="col md-8 offset-md-3">
          <div className="signup-form">
            <form
              className="mt-5 border p-4 bg-light shadow"
              onSubmit={handleSubmit}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <h4 className="text-center md-2 text-primary">
                Sign in to Your Account
              </h4>

              <div className="row">
                {/* Email */}
                <div className="mb-3 col-md-12">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                {/* Password */}
                <div className="mb-3 col-md-12">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          password: event.target.value,
                        })
                      }
                    />
                    <span
                      style={toggleStyle}
                      className="togglePassword"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  </div>
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="col-mid-10">
                  <button className="btn btn-primary float-end">Log In</button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you don't have an account{" "}
              <Link to="/Registration">signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
