import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { MdAdd, MdLocationOn, MdCalendarMonth } from "react-icons/md";
import { PiCaretDownBold } from "react-icons/pi";
import "../Groups.css";
import SearchBar from "../../../SearchBar/SearchBar";
import groupsIcon from "../../../../images/groups-icon.png";
import groupsActiveIcon from "../../../../images/groups-active-icon.png";
import feedIcon from "../../../../images/feed-icon.png";
import feedActiveIcon from "../../../../images/feed-active-icon.png";
import discoverIcon from "../../../../images/discover-icon.png";
import discoverActiveIcon from "../../../../images/discover-active-icon.png";
import notificationIcon from "../../../../images/notifications-icon.png";
import concertIcon from "../../../../images/concert-icon.png";
import businessIcon from "../../../../images/briefcase-icon.png";
import religiousIcon from "../../../../images/pray-icon.png";
import healthIcon from "../../../../images/health-icon.png";
import gamesIcon from "../../../../images/games-icon.png";
import fitnessIcon from "../../../../images/fitness-icon.png";
import speakingIcon from "../../../../images/speak-icon.png";
import partyIcon from "../../../../images/party-icon.png";
import foodIcon from "../../../../images/utensils-icon.png";
import invitesIcon from "../../../../images/invitation-icon.png";
import goingIcon from "../../../../images/going-icon.png";
import interestedIcon from "../../../../images/interested-icon.png";
import pastEventsIcon from "../../../../images/past-icon.png";
import comedyIcon from "../../../../images/comedy-icon.png";
import EventLeftDropdown from "../../Events/LeftBar/LeftDropdown/Dropdown";

function Leftbar({ data, setData, currentRight }) {
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [userData, setUserData] = useState(null);
  const [myEventDropdown, setMyEventDropdown] = useState(false);
  const [topEvents, setTopEvents] = useState(true);
  const [friendEvents, setFriendEvents] = useState(false);
  const [followingEvents, setFollowingEvents] = useState(false);
  const [groupEvents, setGroupEvents] = useState(false);
  const [activeFilterButton, setActiveFilterButton] = useState("top");
  const [createEventModal, setCreateEventModal] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showProfileDropdown = () => {
    setMyEventDropdown(!myEventDropdown);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleBanner = () => {
    setCurrentStep(3);
  };

  const handleToOne = () => {
    setCurrentStep(1);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
        setCurrentStep(1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    const handler = (event) => {
      // Check if the click target is within the dropdown or its related elements
      if (
        !event.target.closest(".lefter_group_main_col_nav_link") &&
        !event.target.closest(".lefter_group_dropdown_menu")
      ) {
        setMyEventDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [myEventDropdown]);

  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      // Check if the cookie exists in the browser
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        // If the cookie exists, send an API call to the backend using Axios
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/verify-auth",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${syncToken}`, // Send the cookie value as a Bearer token
              },
            }
          );

          if (response.status === 200) {
            // If the backend verifies the cookie, set the user data in the state
            setUserData(response.data.user);
          } else {
            // Handle the case where the backend does not verify the cookie
            navigate("/login");

            console.error("Failed to verify the cookie");
          }
        } catch (error) {
          navigate("/login");

          console.error("Error fetching user data:", error);
        }
      } else {
        navigate("/login");
      }
    };

    checkCookieAndFetchData();
  }, [navigate]);

  return (
    <>
      <div className="lefter_group_wrapper">
        <div className="lefter_group_container">
          <div className="lefter_group_main_col_title">
            <h2>Events</h2>
            <div className="lefter_group_main_col_searchbar">
              <SearchBar />
            </div>
          </div>
          <div className="lefter_group_main_col_content">
            <div className="lefter_group_main_col">
              <div className="lefter_group_main_col_nav_wrapper">
                <nav>
                  <div className="lefter_group_main_col_nav_container">
                    <ul className="lefter_group_main_col_nav">
                      <li
                        className={
                          currentRight === 1 ? "lefter_group_active_nav" : ""
                        }
                      >
                        <a
                          href="/attendee/events/:username"
                          tabIndex="0"
                          className="lefter_group_main_col_nav_link"
                        >
                          <div className="lefter_group_main_col_nav_item">
                            <div className="lefter_group_main_col_nav_img_container">
                              <img
                                src={
                                  currentRight === 1 ? feedActiveIcon : feedIcon
                                }
                                alt="Your_Events_Icon"
                              />
                            </div>
                            <div
                              className={
                                currentRight === 1
                                  ? "lefter_group_main_col_nav_title_container_font_white"
                                  : "lefter_group_main_col_nav_title_container"
                              }
                            >
                              <h3>Your Feed</h3>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/attendee/events/:username"
                          tabIndex="0"
                          className="lefter_group_main_col_nav_link"
                        >
                          <div className="lefter_group_main_col_nav_item">
                            <div className="lefter_group_main_col_nav_img_container">
                              <img
                                src={
                                  currentRight === 2
                                    ? discoverActiveIcon
                                    : discoverIcon
                                }
                                alt="Your_Events_Icon"
                              />
                            </div>
                            <div
                              className={
                                currentRight === 2
                                  ? "lefter_group_main_col_nav_title_container_font_white"
                                  : "lefter_group_main_col_nav_title_container"
                              }
                            >
                              <h3>Discover</h3>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={showProfileDropdown}
                          tabIndex="0"
                          className="lefter_group_main_col_nav_link"
                        >
                          <div className="lefter_group_main_col_nav_item">
                            <div className="lefter_group_main_col_nav_img_container">
                              <img
                                src={
                                  currentRight === 3
                                    ? groupsActiveIcon
                                    : groupsIcon
                                }
                                alt="Your_Events_Icon"
                              />
                            </div>
                            <div
                              className={
                                currentRight === 3
                                  ? "lefter_group_main_col_nav_title_container_font_white"
                                  : "lefter_group_main_col_nav_title_container"
                              }
                            >
                              <h3>Your Groups</h3>
                              <div className="lefter_group_main_col_nav_dropdown_btn">
                                <PiCaretDownBold />
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>

                      <div
                        className={`lefter_group_dropdown_menu ${
                          myEventDropdown ? "active" : "inactive"
                        }`}
                      >
                        <ul>
                          <EventLeftDropdown
                            url={`/profile/${
                              userData ? userData.userName : "..."
                            }`}
                            img={
                              <img
                                src={invitesIcon}
                                className="lefter_group_dropdownItem_img"
                                alt="my_profile"
                              />
                            }
                            text={"Invites"}
                          />
                          <EventLeftDropdown
                            url={"/settings"}
                            img={
                              <img
                                src={goingIcon}
                                className="lefter_group_dropdownItem_img"
                                alt="settings"
                              />
                            }
                            text={"Going"}
                          />
                          <EventLeftDropdown
                            url={"/support"}
                            img={
                              <img
                                src={interestedIcon}
                                className="lefter_group_dropdownItem_img"
                                alt="support"
                              />
                            }
                            text={"Interested"}
                          />
                          <EventLeftDropdown
                            url={"/feedback"}
                            img={
                              <img
                                src={pastEventsIcon}
                                className="lefter_group_dropdownItem_img"
                                alt="feedback"
                              />
                            }
                            text={"Past Events"}
                          />
                        </ul>
                      </div>
                    </ul>
                  </div>
                </nav>
              </div>
              <div className="lefter_group_main_col_cta_wrapper">
                <a href="/attendee/groups/create">Create Group</a>
              </div>
            </div>
            <div className="lefter_group_category_col">
              <div className="lefter_group_category_header">
                <div className="lefter_group_category_title">
                  <h2>Groups you've joined</h2>
                </div>
                <div className="lefter_group_category_btn">
                  <a>See All</a>
                </div>
              </div>
              <div className="lefter_group_category_nav_wrapper">
                <div>Groups here...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leftbar;
