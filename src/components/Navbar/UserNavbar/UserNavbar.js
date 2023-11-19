import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UserNavbar.css";
import logo from "../../../images/syncbrite-white-logo.png";
import mobileLogo from "../../../images/syncbrite-white-icon.png";

function UserNavbar() {
  const [icon, setIcon] = useState(true);
  const [mobileIcon, setMobileIcon] = useState(false);

  const showIcon = () => {
    if (window.innerWidth <= 960) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };

  const showMobileIcon = () => {
    if (window.innerWidth <= 960) {
      setMobileIcon(true);
    } else {
      setMobileIcon(false);
    }
  };

  useEffect(() => {
    showIcon();
    showMobileIcon();
  }, []);

  window.addEventListener("resize", showMobileIcon);
  window.addEventListener("resize", showIcon);

  return (
    <div className="login_navbar">
      <div className="nav_text">
        <Link to="/" className="navbar_logo">
          {icon && <img src={logo} className="nav_logo" alt="nav_logo" />}
          {mobileIcon && !icon && (
            <img
              src={mobileLogo}
              className="nav_logo_mobile"
              alt="nav_logo_mobile"
            />
          )}
        </Link>
      </div>
    </div>
  );
}

export default UserNavbar;
