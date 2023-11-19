import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { Button } from "../Button/Button";
import signupIcon from "../../images/signup-icon.png";
import mobileLogo from "../../images/syncbrite-white-icon.png";
import loginIcon from "../../images/login-icon.png";
import UserNavbar from "../Navbar/UserNavbar/UserNavbar";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.accessToken);
      const userData = {
        id: res.data.user.id,
        firstName: res.data.user.firstName,
        lastName: res.data.user.lastName,
        email: res.data.user.email,
        role: res.data.user.role,
      };
      loggedIn(userData);
      if (userData.role === "attendee") {
        navigate("/attendee/dashboard");
      } else if (userData.role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/missing");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_container">
      <UserNavbar />
      <div className="login_form_container">
        <div className="form_left">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Welcome Back</h1>
            <p>Email</p>
            <input
              type="email"
              placeholder="Enter your email address"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="form_input"
            />
            <p>Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="form_input"
            />
            <Link to="/forgot-password" className="forgot_link">
              <p>Forgot Password?</p>
            </Link>
            {error && <div className="error_msg">{error}</div>}
            {loading ? (
              <button type="button" className="green_btn" disabled>
                Loading...
              </button>
            ) : (
              <button type="submit" className="btn_login">
                Log In
                <img src={loginIcon} className="login_icon" alt="login_icon" />
              </button>
            )}
          </form>
        </div>
        <div className="form_right">
          <div className="form_right_logo">
            <img
              src={mobileLogo}
              className="form_logo_icon"
              alt="form_logo_icon"
            />
          </div>

          <h1>Don't have an account yet?</h1>
          <Button
            buttonTo="/signup"
            className="btns"
            buttonStyle="btn_primary"
            buttonSize="btn__large"
          >
            Sign Up
            <img src={signupIcon} className="signup_icon" alt="signup_icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
