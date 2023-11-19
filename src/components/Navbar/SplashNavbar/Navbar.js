import React, { useState, useEffect } from "react";
import { Button } from "../../Button/Button";
import { Link } from "react-router-dom";
import DropdownItem from "../../Dropdown/Dropdown";
import "./Navbar.css";
import logo from "../../../images/syncbrite-blue-logo.png";
import mobileLogo from "../../../images/syncbrite-blue-icon.png";

function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [tools, setTools] = useState(true);
  const [toolLink, setToolLink] = useState(false);
  const [button, setButton] = useState(true);
  const [icon, setIcon] = useState(true);
  const [mobileIcon, setMobileIcon] = useState(false);

  const handleClick = () => setClick(!click);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

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

  const setToolDiv = () => {
    if (window.innerWidth <= 960) {
      setTools(false);
    } else {
      setTools(true);
    }
  };

  const setToolLinkDiv = () => {
    if (window.innerWidth <= 960) {
      setToolLink(true);
    } else {
      setToolLink(false);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      // Check if the click target is within the dropdown or its related elements
      if (
        !event.target.closest(".tools_container") &&
        !event.target.closest(".tools_dropdown_menu")
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [dropdown]);

  useEffect(() => {
    showButton();
    showIcon();
    showMobileIcon();
    setToolDiv();
  }, []);

  window.addEventListener("resize", showButton);
  window.addEventListener("resize", showMobileIcon);
  window.addEventListener("resize", showIcon);
  window.addEventListener("resize", setToolDiv);
  window.addEventListener("resize", setToolLinkDiv);

  return (
    <>
      <nav className="navbar">
        <div className="navbar_container">
          <Link to="/" className="navbar_logo" onClick={closeMobileMenu}>
            {icon && <img src={logo} className="nav_logo" alt="nav_logo" />}
            {mobileIcon && !icon && (
              <img
                src={mobileLogo}
                className="nav_logo_mobile"
                alt="nav_logo_mobile"
              />
            )}
          </Link>
          <div className="menu_icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={click ? "nav_menu active" : "nav_menu"}>
            <li className="nav_item">
              <Link to="/" className="nav_links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            {tools && (
              <div className="tools_container">
                <li className="nav_item">
                  <Link to={tools} className="nav_links" onClick={showDropdown}>
                    Tools <i className="fas fa-caret-down" />
                  </Link>
                </li>
                <div
                  className={`tools_dropdown_menu ${
                    dropdown ? "active" : "inactive"
                  }`}
                >
                  <ul>
                    <DropdownItem url={"/formailer"} text={"Formailer"} />
                    <DropdownItem url={"/tester"} text={"Tester"} />
                    <DropdownItem url={"/syncbrite"} text={"SyncBrite"} />
                    <DropdownItem url={"/jiver"} text={"Jiver"} />
                  </ul>
                </div>
              </div>
            )}
            {toolLink && !tools && (
              <div className="tools_container">
                <li className="nav_item">
                  <Link
                    to="/tools"
                    className="nav_links"
                    onClick={closeMobileMenu}
                  >
                    Tools
                  </Link>
                </li>
              </div>
            )}

            <li className="nav_item">
              <Link
                to="/services"
                className="nav_links"
                onClick={closeMobileMenu}
              >
                Solutions
              </Link>
            </li>
            <li className="nav_item">
              <Link
                to="/solutions"
                className="nav_links"
                onClick={closeMobileMenu}
              >
                Documentation
              </Link>
            </li>
            <li className="nav_item signup">
              <Link
                to="/sign-up"
                className="nav_links_mobile"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </li>
            <li className="nav_item login">
              <Link
                to="/login"
                className="nav_links_mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          <div className="cta">
            {button && (
              <Button buttonTo="/login" buttonStyle="btn__cta">
                My Account
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
