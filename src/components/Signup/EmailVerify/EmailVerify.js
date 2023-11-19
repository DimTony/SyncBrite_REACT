import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmailVerify.css";
import { Button } from "../../Button/Button";
import UserNavbar from "../../Navbar/UserNavbar/UserNavbar";
import loginIcon from "../../../images/login-icon.png";
import success_img from "../../../images/success.png";
import error_img from "../../../images/error.png";

const EmailVerify = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Extract `id` and `token` from the URL
    const url = window.location.href;
    const idTokenMatch = url.match(/\/users\/([^/]+)\/verify\/([^/]+)/);

    if (idTokenMatch) {
      const id = idTokenMatch[1];
      const token = idTokenMatch[2];

      // Send a GET request to the router endpoint
      axios
        .get(`http://localhost:8080/api/users/${id}/verify/${token}`)
        .then((response) => {
          // Handle the response status
          setStatus(response.status);
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="verified_container">
      <UserNavbar />
      {status === 200 ? (
        <div className="verified_success_container">
          <div className="verified_success_msg">
            <img src={success_img} alt="success_img" />
            <h1>Email Verified Successfully</h1>
            <Button
              buttonTo="/login"
              className="btns_verified_login"
              buttonStyle="btn_primary"
              buttonSize="btn__large"
            >
              Login
              <img src={loginIcon} className="login_icon" alt="login_icon" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="verified_error_container">
          <img src={error_img} className="error_img" alt="error_img" />

          <h2>Error</h2>
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
