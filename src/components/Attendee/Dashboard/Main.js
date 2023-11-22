import React, { useState, useEffect } from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import TimedOut from "../../TimedOut/TimedOut";
import VerifyUser from "../../../helpers/VerifyUser";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";
import mobileLogo from "../../../images/syncbrite-white-icon.png";
import groupIcon from "../../../images/group-nav-icon.png";
import memoriesIcon from "../../../images/memories-icon.png";
import savedIcon from "../../../images/saved-icon.png";
import adsIcon from "../../../images/ads-icon.png";
import messengerIcon from "../../../images/messenger-icon.png";
import fundraiserIcon from "../../../images/fundraiser-icon.png";
import grammarlyIcon from "../../../images/grammarly.jpg";
import placeholderIcon from "../../../images/placeholder.png";
import createIcon from "../../../images/create-icn.png";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserStatus = async () => {
      const { user, isLoggedIn, error } = await VerifyUser(navigate);

      if (isLoggedIn) {
        // User is authenticated
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        // User is not authenticated
        setIsLoggedIn(false);
        setError("User Unauthorized");
      }
    };

    checkUserStatus();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="main_container">
          <AttendeeNavbar
            isLoggedIn={isLoggedIn}
            userData={userData}
            error={error}
            setUserData={setUserData}
          />

          <div className="dashboard_hero_container">
            <div className="left_section">
              <div className="left_profile_nav">
                <ul>
                  <li>
                    <div className="left_profile">
                      <a
                        href="/profile"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_profile_img">
                          <div className="hero_nav_img">
                            <div className="hero_img_holder">
                              <img
                                src={mobileLogo}
                                className="hero_profile_img"
                                alt="hero_profile_img"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="left_profile_name">
                          {userData ? userData.fullName : "Loading..."}
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="left_menu_nav">
                <ul className="left_menu_nav_container">
                  <li>
                    <div className="left_menu_nav_item">
                      <a
                        href="/groups"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={groupIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div className="text-3xl font-bold underline">
                          Find Groups
                        </div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="left_menu_nav_item">
                      <a
                        href="/memories"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={memoriesIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div>Memories</div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="left_menu_nav_item">
                      <a
                        href="/saved"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={savedIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div>Saved</div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="left_menu_nav_item">
                      <a href="/ads" tabIndex="0" className="left_profile_link">
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={adsIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div>Ads Manager</div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="left_menu_nav_item">
                      <a
                        href="/messenger"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={messengerIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div>Messenger</div>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="left_menu_nav_item">
                      <a
                        href="/fundraiser"
                        tabIndex="0"
                        className="left_profile_link"
                      >
                        <div className="left_menu_nav_img_container">
                          <div>
                            <img
                              src={fundraiserIcon}
                              className="left_menu_nav_img"
                              alt="hero_profile_img"
                            />
                          </div>
                        </div>
                        <div>Fundraiser</div>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="left_shortcut_nav">Shortcuts...</div>
            </div>
            <div className="center_section">Center</div>
            <div className="right_section">
              <div className="right_container">
                <div className="right_sponsored">
                  <div className="right_sponsored_header">
                    <h3>Sponsored</h3>
                  </div>
                  <div className="right_sponsored_items">
                    <div>
                      <div className="right_sponsored_item">
                        <a href="/grammarly">
                          <div className="right_sponsored_item_img_container">
                            <img
                              src={grammarlyIcon}
                              className="right_sponsored_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_sponsored_item_text">
                            <span className="right_sponsored_item_title">
                              Grammarly
                            </span>
                            <span className="right_sponsored_item_description">
                              Grammarly is here to help
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className="right_sponsored_item">
                        <a href="/grammarly">
                          <div className="right_sponsored_item_img_container">
                            <img
                              src={grammarlyIcon}
                              className="right_sponsored_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_sponsored_item_text">
                            <span className="right_sponsored_item_title">
                              Grammarly
                            </span>
                            <span className="right_sponsored_item_description">
                              Grammarly is here to help
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right_contacts">
                  <div className="right_contacts_header">
                    <div className="right_contacts_header_text">
                      <span>Contacts</span>
                    </div>
                    <div className="right_contacts_header_search_icon">
                      <i class="fas fa-magnifying-glass" />
                    </div>
                    <div className="right_contacts_header_ellipses_icon">
                      <i class="fas fa-ellipsis" />
                    </div>
                  </div>
                  <div className="right_contacts_items">
                    <div>
                      <div className="right_contacts_item">
                        <a href="/contact-profile-1">
                          <div className="right_contacts_item_img_container">
                            <img
                              src={placeholderIcon}
                              className="right_contacts_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_contacts_item_text">
                            <span className="right_contacts_item_name">
                              John Obi
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className="right_contacts_item">
                        <a href="/contact-profile-1">
                          <div className="right_contacts_item_img_container">
                            <img
                              src={placeholderIcon}
                              className="right_contacts_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_contacts_item_text">
                            <span className="right_contacts_item_name">
                              John Obi
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right_group_conversations">
                  <div className="right_conversations_header">
                    <div className="right_conversations_header_text">
                      <span>Group Conversations</span>
                    </div>
                    <div className="right_conversations_header_search_icon">
                      <i class="fas fa-magnifying-glass" />
                    </div>
                    <div className="right_conversations_header_ellipses_icon">
                      <i class="fas fa-ellipsis" />
                    </div>
                  </div>
                  <div className="right_conversations_items">
                    <div>
                      <div className="right_conversations_item">
                        <a href="/contact-profile-1">
                          <div className="right_conversations_item_img_container">
                            <img
                              src={placeholderIcon}
                              className="right_conversations_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_conversations_item_text">
                            <span className="right_conversations_item_name">
                              John Obi
                            </span>
                          </div>
                        </a>
                      </div>
                      <div className="right_conversations_item">
                        <a href="/group/create">
                          <div className="right_conversations_item_img_container">
                            <img
                              src={createIcon}
                              className="right_conversations_item_img"
                              alt="right_item_img"
                            />
                          </div>
                          <div className="right_conversations_item_text">
                            <span className="right_conversations_item_name">
                              Create new group
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <TimedOut />
      )}
    </>
  );
}

export default Main;
