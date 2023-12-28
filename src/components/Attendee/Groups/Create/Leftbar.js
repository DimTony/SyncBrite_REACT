import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
import "./Create.css";

function Leftbar({
  user,
  data,
  setData,
  groupName,
  setGroupName,
  privacy,
  setPrivacy,
  groupBanner,
  invites,
  isCreateEnabled,
  setIsCreateEnabled,
  handleGroupNameChange,
  handlePrivacyChange,
  handleBannerImageChange,
  handleInvitesChange,
  handleCreateGroup,
}) {
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [userData, setUserData] = useState(null);
  const [myEventDropdown, setMyEventDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
        !event.target.closest(".lefter_createGroup_main_col_nav_link") &&
        !event.target.closest(".lefter_createGroup_dropdown_menu")
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
            "https://syncbrite.onrender.comapi/auth/verify-auth",
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
      <div className="lefter_createGroup_wrapper">
        <div className="lefter_createGroup_container">
          <div className="lefter_createGroup_main_col_btn_wrapper">
            <a
              href="/attendee/groups"
              className="lefter_createGroup_main_col_btn_container"
            >
              <IoMdCloseCircle size={30} />
            </a>
          </div>
          <div className="lefter_createGroup_main_col_content">
            <div className="lefter_createGroup_main_col_header_wrapper">
              <div className="lefter_createGroup_main_col_header_container">
                <div className="lefter_createGroup_main_col_header_pageInfo_wrapper">
                  <div className="lefter_createGroup_main_col_header_pageInfo_contanier">
                    Groups - Create
                  </div>
                </div>
                <div className="lefter_createGroup_main_col_header_title_wrapper">
                  <div className="lefter_createGroup_main_col_header_title_container">
                    Create Group
                  </div>
                </div>
              </div>
            </div>
            <div className="lefter_createGroup_main_col_header_adminInfo_wrapper">
              <div className="lefter_createGroup_main_col_header_adminInfo_container">
                <div className="lefter_createGroup_main_col_header_adminImage_wrapper">
                  <div className="lefter_createGroup_main_col_header_adminImage_container">
                    <img
                      src={user ? user.profilePic : <Skeleton />}
                      className="lefter_createGroup_main_col_header_adminImage"
                      alt="profilePic"
                    />
                  </div>
                </div>
                <div className="lefter_createGroup_main_col_header_adminTag_wrapper">
                  <div className="lefter_createGroup_main_col_header_adminTag_container">
                    <div className="lefter_createGroup_main_col_header_adminName_wrapper">
                      <div className="lefter_createGroup_main_col_header_adminName_container">
                        {user ? user.fullName : <Skeleton />}
                      </div>
                    </div>
                    <div className="lefter_createGroup_main_col_header_adminStatus_wrapper">
                      <div className="lefter_createGroup_main_col_header_adminStatus_container">
                        <span>Admin</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lefter_createGroup_main_col_input_wrapper">
              <div className="lefter_createGroup_main_col_input_container">
                <div className="lefter_createGroup_input_wrapper">
                  {/* Left Side */}
                  <div className="lefter_createGroup_input_container">
                    <label className="lefter_createGroup_input_text">
                      Group Name:
                      <input
                        type="text"
                        value={groupName}
                        onChange={handleGroupNameChange}
                        className="lefter_createGroup_main_col_input"
                      />
                    </label>
                    <br />
                    <label className="lefter_createGroup_input_select">
                      Privacy:
                      <select
                        value={privacy}
                        onChange={handlePrivacyChange}
                        className="lefter_createGroup_main_col_input"
                      >
                        <option value=""></option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                    </label>
                    <br />
                    <label className="lefter_createGroup_input_text">
                      Group Banner:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBannerImageChange}
                        className="lefter_createGroup_main_col_input_file"
                      />
                    </label>
                    <br />
                    <label className="lefter_createGroup_input_text">
                      Invites:
                      <input
                        type="text"
                        value={invites.join(",")}
                        onChange={handleInvitesChange}
                        className="lefter_createGroup_main_col_input"
                      />
                    </label>
                    <br />
                    <div className="lefter_createGroup_input_btn_container">
                      <button
                        onClick={handleCreateGroup}
                        className="lefter_createGroup_input_btn"
                      >
                        Create Group
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leftbar;
