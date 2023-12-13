import React, { useEffect } from "react";
import { BsCameraReels } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import {
  MdOutlineHome,
  MdOutlineSupportAgent,
  MdOutlineGroups,
  MdEvent,
  MdOutlineCameraAlt,
} from "react-icons/md";
import "../Leftbar.css";

function MyLeftbar({ user }) {
  useEffect(() => {
    const changeBGColor = () => {
      const navItems = document.getElementsByClassName("sidebar_nav_item");
      const currentPath = window.location.pathname;

      for (let i = 0; i < navItems.length; i++) {
        const navItemPath = navItems[i].getAttribute("data-path");
        if (navItemPath === currentPath) {
          navItems[i].style.backgroundColor = "#ededff";
        } else {
          navItems[i].style.backgroundColor = ""; // Reset background color for other items
        }
      }
    };

    // Call the function initially and whenever the pathname changes
    changeBGColor();
    window.addEventListener("popstate", changeBGColor);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", changeBGColor);
    };
  }, []);

  return (
    <>
      <div className="leftbar_wrapper">
        <div className="leftbar">
          <div className="sidebar" data="blue">
            <div className="sidebar_wrapper ps">
              <ul className="sidebar_nav">
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}`}
                    className="sidebar_nav_link active"
                  >
                    <MdOutlineHome />
                    <div className="sidebar_nav_link_text">
                      <p>Dashboard</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/friends`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/friends`}
                    className="sidebar_nav_link"
                  >
                    <LiaUserFriendsSolid />
                    <div className="sidebar_nav_link_text">
                      <p>Friends</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/groups`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/groups`}
                    className="sidebar_nav_link"
                  >
                    <MdOutlineGroups />
                    <div className="sidebar_nav_link_text">
                      <p>Groups</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/events`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/events`}
                    className="sidebar_nav_link"
                  >
                    <MdEvent />
                    <div className="sidebar_nav_link_text">
                      <p>Events</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/likes`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/likes`}
                    className="sidebar_nav_link"
                  >
                    <FaRegHeart />
                    <div className="sidebar_nav_link_text">
                      <p>Likes</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/photos`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/photos`}
                    className="sidebar_nav_link"
                  >
                    <MdOutlineCameraAlt />
                    <div className="sidebar_nav_link_text">
                      <p>Photos</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/videos`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/videos`}
                    className="sidebar_nav_link"
                  >
                    <BsCameraReels />
                    <div className="sidebar_nav_link_text">
                      <p>Videos</p>
                    </div>
                  </a>
                </li>
                <li
                  className="sidebar_nav_item"
                  data-path={`/profile/${user ? user.userName : "..."}/support`}
                >
                  <a
                    href={`/profile/${user ? user.userName : "..."}/support`}
                    className="sidebar_nav_link"
                  >
                    <MdOutlineSupportAgent />
                    <div className="sidebar_nav_link_text">
                      <p>Support</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyLeftbar;
