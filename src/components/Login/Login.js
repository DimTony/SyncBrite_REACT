import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Login.css";
import { Button } from "../Button/Button";
import signupIcon from "../../images/signup-icon.png";
import mobileLogo from "../../images/syncbrite-white-icon.png";
import loginIcon from "../../images/login-icon.png";
import UserNavbar from "../Navbar/UserNavbar/UserNavbar";
// import { useAuth } from "../../context/AuthContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  // const { loggedIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const url = "https://syncbrite.onrender.comapi/auth";
      const { data: res } = await axios.post(url, data, {
        withCredentials: true,
      });
      if (res) {
        if (res.status >= 400 || res.status <= 500) {
          generateError(res.message);
        } else {
          localStorage.setItem("token", res.data.accessToken);
          setCookie("SyncBriteToken", res.data.accessToken, { path: "/" });
          const { role } = res.data.user;
          // loggedIn(userData);
          if (role === "attendee") {
            navigate("/attendee/dashboard");
          } else if (role === "organizer") {
            navigate("/organizer/dashboard");
          } else {
            navigate("/missing");
          }
        }
      } else {
        generateError("Server Not Responding...");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        generateError(error.response.data.message);
        setError(error.response.data.message);
      } else if (error.request) {
        generateError("Server Not Responding");
      } else {
        generateError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_container">
      <UserNavbar />
      <ToastContainer />
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
