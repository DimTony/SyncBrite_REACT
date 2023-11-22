import React from "react";
import "./TimedOut.css";
import { Button } from "../Button/Button";
import mobileLogo from "../../images/syncbrite-white-icon.png";
import UserNavbar from "../Navbar/UserNavbar/UserNavbar";
import loginIcon from "../../images/login-icon.png";

function TimedOut() {
  return (
    <div className="timed_out_container">
      <UserNavbar />
      <div className="timed_out_div">
        <div className="logo">
          <img src={mobileLogo} className="logo_icon" alt="logo_icon" />
        </div>

        <h1>Your session has timed out! Please Login Again...</h1>
        <Button
          buttonTo="/login"
          className="btns"
          buttonStyle="btn_primary"
          buttonSize="btn__large"
        >
          Login
          <img src={loginIcon} className="login_icon" alt="login_icon" />
        </Button>
      </div>
    </div>
  );
}

export default TimedOut;
