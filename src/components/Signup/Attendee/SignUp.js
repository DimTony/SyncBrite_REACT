import React, { useState } from "react";
import { IoPersonAdd } from "react-icons/io5";
import axios from "axios";
import "./SignUp.css";
import UserNavbar from "../../Navbar/UserNavbar/UserNavbar";
import signupIcon from "../../../images/signup-icon.png";
import success_img from "../../../images/success.png";

function Signup() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "attendee",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showform, setShowForm] = useState(true);

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords Do Not Match");
    } else {
      setLoading(true);
      try {
        const url = "https://syncbrite.onrender.com/api/users/signup";
        const { data: res } = await axios.post(url, data);

        setMsg(res.message);
        setError(false);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "attendee",
        });
      } catch (error) {
        if (!error?.response) {
          setError("Error Connecting To Server!");
        } else if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        } else {
          setError("SignUp Failed");
        }
      } finally {
        setLoading(false);
        setShowForm(false);
      }
    }
  };

  return (
    <div className="attendee_container">
      <UserNavbar />
      <div className="attendee_form_wrapper">
        <div className="attendee_form_container">
          <div className="attendee_form_header">
            <h1>Create Your Account</h1>
          </div>
          <div className="attendee_form_input_wrapper">
            {showform && (
              <form
                className="attendee_form_input_container"
                onSubmit={handleSubmit}
              >
                <div className="attendee_form_label">
                  <p>First Name</p>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required
                    className="attendee_form_input"
                  />
                </div>
                <div className="attendee_form_label">
                  <p>Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
                    required
                    className="attendee_form_input"
                  />
                </div>
                <div className="attendee_form_label">
                  <p>Email</p>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className="attendee_form_input"
                  />
                </div>
                <div className="attendee_form_label">
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className="attendee_form_input"
                  />
                </div>
                <div className="attendee_form_label">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={data.confirmPassword}
                    required
                    className="attendee_form_input"
                  />
                </div>
                {error && <div className="error_msg">{error}</div>}
                {loading ? (
                  <button type="button" className="green_btn" disabled>
                    Loading...
                  </button>
                ) : (
                  <div className="attendee_signup_btn_wrapper">
                    <button type="submit" className="attendee_signup_btn">
                      Create Account
                      <IoPersonAdd />
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
          {msg && !error && (
            <div className="success_container">
              <div className="success_msg">
                <img src={success_img} alt="success_img" />

                <div className="success_text">{msg}</div>
                <div className="success_login_text">
                  <p>Already have an account?&nbsp;&nbsp;</p>
                  <a className="login_link" href="/login">
                    Login
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
