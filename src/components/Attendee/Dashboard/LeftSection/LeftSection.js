import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Main.css";
import groupIcon from "../../../../images/group-nav-icon.png";
import memoriesIcon from "../../../../images/memories-icon.png";
import savedIcon from "../../../../images/saved-icon.png";
import eventsIcon from "../../../../images/events-blue-icon.png";
import messengerIcon from "../../../../images/messenger-icon.png";
import fundraiserIcon from "../../../../images/fundraiser-icon.png";
import placeholderIcon from "../../../../images/placeholder.png";

function LeftSection({ userData }) {
  return (
    <>
      <div className="left_section_wrapper">
        <div className="left_section">
          <div className="left_profile_nav">
            <ul className="left_profile_nav_list">
              <li>
                <div className="left_profile">
                  <a
                    href={`/profile/${
                      userData ? userData.userName : <Skeleton />
                    }`}
                    tabIndex="0"
                    className="left_profile_link"
                  >
                    <div className="left_profile_img">
                      <div className="hero_nav_img">
                        <div className="hero_img_holder">
                          <img
                            src={
                              userData ? userData.profilePic : placeholderIcon
                            }
                            className="hero_profile_img"
                            alt="hero_profile_img"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="left_profile_name">
                      {userData ? userData.fullName : <Skeleton />}
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div className="left_menu_nav">
            <ul className="left_menu_nav_container">
              <li>
                <a
                  href="/attendee/events"
                  tabIndex="0"
                  className="left_profile_link"
                >
                  <div className="left_menu_nav_item">
                    <div className="left_menu_nav_img_container">
                      <div>
                        <img
                          src={eventsIcon}
                          className="left_menu_nav_img"
                          alt="hero_profile_img"
                        />
                      </div>
                    </div>
                    <div>Events</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/groups" tabIndex="0" className="left_profile_link">
                  <div className="left_menu_nav_item">
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
                  </div>
                </a>
              </li>
              <li>
                <a href="/memories" tabIndex="0" className="left_profile_link">
                  <div className="left_menu_nav_item">
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
                  </div>
                </a>
              </li>
              <li>
                <a href="/saved" tabIndex="0" className="left_profile_link">
                  <div className="left_menu_nav_item">
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
                  </div>
                </a>
              </li>

              <li>
                <a href="/messenger" tabIndex="0" className="left_profile_link">
                  <div className="left_menu_nav_item">
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
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="/fundraiser"
                  tabIndex="0"
                  className="left_profile_link"
                >
                  <div className="left_menu_nav_item">
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
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="left_shortcut_nav">Shortcuts...</div>
        </div>
      </div>
    </>
  );
}

export default LeftSection;
