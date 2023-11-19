import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DashboardNavbar.css";
import SearchBar from "../SearchBar/SearchBar";
import ProfileDropdownItem from "../Navbar/ProfileDropdown/ProfileDropdown";
import SearchResultsList from "../SearchBar/Results/SearchResultsList";
import logo from "../../../images/syncbrite-blue-logo.png";
import mobileLogo from "../../../images/syncbrite-blue-icon.png";
import homeIcon from "../../../images/home-icon-active.png";
import homeInactiveIcon from "../../../images/home-icon-inactive.png";
import groupIcon from "../../../images/group-icon-active.png";
import groupInactiveIcon from "../../../images/group-icon-inactive.png";
import eventIcon from "../../../images/event-icon-active.png";
import eventInactiveIcon from "../../../images/event-icon-inactive.png";
import notificationIcon from "../../../images/notifications-icon-active.png";
import notificationInactiveIcon from "../../../images/notifications-icon-inactive.png";
import hamburgerIcon from "../../../images/hamburger-active.png";
import myProfileIcon from "../../../images/profile-icon.png";
import settingsIcon from "../../../images/settings-icon.png";
import supportIcon from "../../../images/support-icon.png";
import feedbackIcon from "../../../images/feedback-icon.png";
import logoutIcon from "../../../images/logout-icon.png";
import profilePicPlaceholder from "../../../images/placeholder.png";

function DashboardNavbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [button, setButton] = useState(true);
  const [icon, setIcon] = useState(true);
  const [mobileIcon, setMobileIcon] = useState(false);
  const [results, setResults] = useState([]);
  const [home, setHome] = useState(false);
  const [group, setGroup] = useState(false);
  const [event, setEvent] = useState(false);
  const [notification, setNotification] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  const showHamburgerDropdown = () => {
    setDropdown(!dropdown);
  };

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

  const showProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
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

  const setNavIcon = () => {
    if (window.location.pathname === "/dashboard") {
      setHome(true);
      setGroup(false);
      setEvent(false);
      setNotification(false);
    } else if (window.location.pathname === "/groups") {
      setHome(false);
      setGroup(true);
      setEvent(false);
      setNotification(false);
    } else if (window.location.pathname === "/events") {
      setHome(false);
      setGroup(false);
      setEvent(true);
      setNotification(false);
    } else if (window.location.pathname === "/notifications") {
      setHome(false);
      setGroup(false);
      setEvent(false);
      setNotification(true);
    } else {
      setHome(false);
      setGroup(false);
      setEvent(false);
      setNotification(false);
    }
  };

  useEffect(() => {
    const handler = (event) => {
      // Check if the click target is within the dropdown or its related elements
      if (
        !event.target.closest(".dashboard_profile_menu") &&
        !event.target.closest(".dashboard_dropdown_menu")
      ) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [profileDropdown]);

  useEffect(() => {
    showButton();
    showIcon();
    showMobileIcon();
    setNavIcon();
  }, []);

  window.addEventListener("resize", showButton);
  window.addEventListener("resize", showMobileIcon);
  window.addEventListener("resize", showIcon);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="dashboard_navbar">
        <div className="dashboard_navbar_container">
          <Link
            to="/dashboard"
            className="dashboard_navbar_logo"
            onClick={closeMobileMenu}
          >
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
          <div className="dashboard_searchbar">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
          </div>
          <ul
            className={
              click ? "dashboard_nav_menu active" : "dashboard_nav_menu"
            }
          >
            <li className="nav_item">
              <Link
                to="/dashboard"
                className="nav_links"
                onClick={closeMobileMenu}
              >
                {home ? (
                  <img
                    src={homeIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                ) : (
                  <img
                    src={homeInactiveIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                )}
              </Link>
            </li>
            <li className="nav_item">
              <Link to="/groups" className="nav_links" onClick={showDropdown}>
                {group ? (
                  <img
                    src={groupIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                ) : (
                  <img
                    src={groupInactiveIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                )}
              </Link>
            </li>

            <li className="nav_item">
              <Link
                to="/events"
                className="nav_links"
                onClick={closeMobileMenu}
              >
                {event ? (
                  <img
                    src={eventIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                ) : (
                  <img
                    src={eventInactiveIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                )}
              </Link>
            </li>
            <li className="nav_item">
              <Link
                to="/notifications"
                className="nav_links"
                onClick={closeMobileMenu}
              >
                {notification ? (
                  <img
                    src={notificationIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                ) : (
                  <img
                    src={notificationInactiveIcon}
                    className="nav_logo_mobile"
                    alt="nav_logo_mobile"
                  />
                )}
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
          <div className="dashboard_ctas">
            {button && (
              <div className="dashboard_profile_menu">
                <div className="dashboard_profile_dropdown">
                  <img
                    onClick={showProfileDropdown}
                    src={profilePicPlaceholder}
                    className="dashboard_profile_pic"
                    alt="dashboard_profile_pic"
                  />
                  <div
                    className={`dashboard_dropdown_menu ${
                      profileDropdown ? "active" : "inactive"
                    }`}
                  >
                    <ul>
                      <ProfileDropdownItem
                        url={"/profile"}
                        img={<img src={myProfileIcon} alt="my_profile" />}
                        text={"My Profile"}
                      />
                      <ProfileDropdownItem
                        url={"/settings"}
                        img={<img src={settingsIcon} alt="settings" />}
                        text={"Settings & Privacy"}
                      />
                      <ProfileDropdownItem
                        url={"/support"}
                        img={<img src={supportIcon} alt="support" />}
                        text={"Help & Support"}
                      />
                      <ProfileDropdownItem
                        url={"/feedback"}
                        img={<img src={feedbackIcon} alt="feedback" />}
                        text={"Feedback"}
                      />
                      <ProfileDropdownItem
                        onClick={handleLogout}
                        img={<img src={logoutIcon} alt="logout" />}
                        text={"Logout"}
                      />
                    </ul>
                  </div>
                </div>

                <div className="dashboard_hamburger_menu">
                  <Link className="nav_links" onClick={showHamburgerDropdown}>
                    <img
                      src={hamburgerIcon}
                      className="dashboard_hamburger_icon"
                      alt="dashboard_hamburger_icon"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default DashboardNavbar;
