import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { BsStack } from "react-icons/bs";
import {
  FaEllipsisH,
  FaCaretDown,
  FaRegHeart,
  FaRegCommentDots,
  FaTimes,
} from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ImMail4 } from "react-icons/im";
import { IoMdHome, IoMdCloseCircle } from "react-icons/io";
import {
  MdAdd,
  MdLocationOn,
  MdCalendarMonth,
  MdClose,
  MdModeEdit,
  MdOutlineMail,
  MdArrowDropDown,
  MdPeople,
  MdPerson,
  MdLock,
  MdGroups3,
  MdPublic,
  MdOutlineHandshake,
  MdLockOpen,
} from "react-icons/md";
import { PiCaretDownBold } from "react-icons/pi";
import successImg from "../../../../../../images/success.png";

function Leftbar({
  data,
  setData,
  userData,
  group,
  currentRight,
  setCurrentRight,
}) {
  const [groupPrivacyIcon, setGroupPrivacyIcon] = useState(null);
  const [groupPrivacyPostIcon, setGroupPrivacyPostIcon] = useState(null);
  const [groupTypeText, setGroupTypeText] = useState(null);
  const [groupPrivacyText, setGroupPrivacyText] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(null);
  const [cookies, removeCookie] = useCookies([]);
  const [myEventDropdown, setMyEventDropdown] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [inputEmail, setInputEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [adminToolsDropdown, setAdminToolsDropdown] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [insightDropdown, setInsightDropdown] = useState(false);
  const [supportDropdown, setSupportDropdown] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("gggg", group);
    if (group) {
      if (group) {
        if (group.privacy === "Public") {
          setGroupPrivacyIcon(<MdPublic size={17} color={"#a6cfff"} />);
          setGroupPrivacyPostIcon(<MdPublic size={15} />);
        } else if (group.privacy === "Private") {
          setGroupPrivacyIcon(<MdLock size={17} color={"#a6cfff"} />);
          setGroupPrivacyPostIcon(<MdLock size={15} />);
        }
      }
    }
  }, [group]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputEmail("");
    setError("");
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleAddEmail = () => {
    if (inputEmail.trim() === "") {
      setError("Please enter a valid email.");
      return;
    }

    // Check if the input is a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setError("Please enter a valid email format: name@example.com");
      return;
    }

    // Check if the email is already in the array
    if (emails.includes(inputEmail)) {
      setError("Email already added.");
      return;
    }

    setEmails([...emails, inputEmail]);
    setInputEmail("");
    setError("");
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = [...emails];
    updatedEmails.splice(index, 1);
    setEmails(updatedEmails);
  };

  const handleSend = async () => {
    setIsLoading(true);
    if (emails.length === 0) {
      // Handle the case where there are no emails to send
      setError("Please add at least one email to send invites.");
      return;
    }
    const url = window.location.href;
    const groupIdMatch = url.match(/\/attendee\/groups\/([^/]+)/);
    const syncToken = cookies.SyncBriteToken;
    if (!syncToken) {
      navigate("/login");
      return;
    }

    if (groupIdMatch) {
      const groupId = groupIdMatch[1];

      const response = await axios.post(
        `http://localhost:8080/api/groups/invites/send/${groupId}`,
        emails,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${syncToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Invitations sent successfully!", response.data);
        setIsSuccess(true);

        // Reset the state and close the modal
        setEmails([]);

        // You can also show a success toast or perform any other actions
        toast.success("Invitations sent successfully!");
        setIsLoading(false);
      } else {
        console.error("Error sending invitations:", response);

        toast.error("Error sending invitations. Please try again.");
      }
    }
  };

  const resetInputDisplay = () => {
    setInputEmail("");
    setError("");
    setIsLoading(false);
    setIsSuccess(false);
    setEmails([]);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false); // Hide the success display
    closeModal(); // Close the modal
  };

  const handleNavItemClick = (value) => {
    setCurrentRight(value);
  };

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "adminTools":
        setAdminToolsDropdown(!adminToolsDropdown);
        break;
      case "settings":
        setSettingsDropdown(!settingsDropdown);
        break;
      case "insight":
        setInsightDropdown(!insightDropdown);
        break;
      case "support":
        setSupportDropdown(!supportDropdown);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handler = (event) => {
      // Check if the click target is within the dropdown or its related elements
      if (
        !event.target.closest(".superAdmin_groups_main_col_nav_link") &&
        !event.target.closest(".superAdmin_groups_dropdown_menu")
      ) {
        setMyEventDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [myEventDropdown]);

  return (
    <>
      <div className="superAdmin_groups_wrapper">
        <div className="superAdmin_groups_container">
          <div className="superAdmin_groups_main_col_title">
            <div className="superAdmin_groups_main_col_title_wrapper">
              <div className="superAdmin_groups_main_col_title_container">
                <div className="superAdmin_groups_main_col_groupPic_wrapper">
                  <div className="superAdmin_groups_main_col_groupPic_container">
                    <img
                      src={group.groupImage}
                      className="superAdmin_groups_main_col_groupPic"
                    />
                  </div>
                </div>
                <div className="superAdmin_groups_main_col_groupInfo_wrapper">
                  <div className="superAdmin_groups_main_col_groupInfo_container">
                    <div className="superAdmin_groups_main_col_groupName_wrapper">
                      <div className="superAdmin_groups_main_col_groupName_container">
                        <span>{group.name}</span>
                      </div>
                    </div>
                    <div className="superAdmin_groups_main_col_groupMetrics_wrapper">
                      <div className="superAdmin_groups_main_col_groupMetrics_container">
                        <div className="superAdmin_groups_main_col_groupStatus_wrapper">
                          <div className="superAdmin_groups_main_col_groupStatus_container">
                            <span>
                              {groupPrivacyIcon} {group.privacy} group
                            </span>
                          </div>
                        </div>
                        <div>
                          <span>·</span>
                        </div>
                        <div className="superAdmin_groups_main_col_groupMemberCount_wrapper">
                          <div className="superAdmin_groups_main_col_groupMemberCount_container">
                            <span>
                              {group.members.length === 1
                                ? `${group.members.length} member`
                                : `${group.members.length} members`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="superAdmin_groups_main_col_title_btns_wrapper">
              <div className="superAdmin_groups_main_col_title_btns_container">
                <div className="superAdmin_groups_main_col_title_inviteBtn_wrapper">
                  <div className="superAdmin_groups_main_col_title_inviteBtn_container">
                    <button
                      onClick={openModal}
                      className="superAdmin_groups_main_col_title_inviteBtn"
                    >
                      <FaPlus />
                      Invite
                    </button>
                  </div>

                  {isModalOpen && (
                    <div
                      className="superAdmin_groups_inviteBtn_modal_overlay"
                      onClick={closeModal}
                    >
                      <div
                        onClick={stopPropagation}
                        className="superAdmin_groups_inviteBtn_modal_content"
                      >
                        {isLoading ? (
                          // Show loading spinner
                          <div className="superAdmin_groups_main_col_loading_spinner">
                            <HashLoader color="#003366" size={100} />
                          </div>
                        ) : isSuccess ? (
                          // Show success message with buttons
                          <div className="superAdmin_groups_inviteBtn_modal_content_success">
                            <div className="superAdmin_groups_inviteBtn_modal_content_success_title">
                              <h2>Invites Sent Successfully!</h2>
                            </div>
                            <div>
                              <img src={successImg} alt="success_img" />
                            </div>
                            <div className="superAdmin_groups_inviteBtn_modal_success_buttons">
                              <button onClick={resetInputDisplay}>
                                Send More Invites
                              </button>
                              <button onClick={handleSuccessClose}>
                                Close
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Show the regular content for sending invites
                          <>
                            {/* ... (your existing modal content) */}
                            <div className="superAdmin_groups_inviteBtn_modal_content_header_wrapper">
                              <div className="superAdmin_groups_inviteBtn_modal_content_header_container">
                                <div className="superAdmin_groups_inviteBtn_modal_content_header_title">
                                  Invite Via Email
                                </div>
                                <div className="superAdmin_groups_inviteBtn_modal_content_header_closeBtn">
                                  <IoMdCloseCircle
                                    onClick={closeModal}
                                    size={40}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="superAdmin_groups_inviteBtn_modal_body_wrapper">
                              <div className="superAdmin_groups_inviteBtn_modal_body_container">
                                <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_wrapper">
                                  <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_container">
                                    <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_title_wrapper">
                                      <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_title_container">
                                        <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_title">
                                          <span>Invite Message</span>
                                        </div>
                                        <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_subTitle">
                                          <span>
                                            Email recipients will see this
                                            message:
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_content_wrapper">
                                      <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_content_container">
                                        <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_content">
                                          <span>Message</span>
                                        </div>
                                        <div className="superAdmin_groups_inviteBtn_modal_content_msgPreview_subContent">
                                          <span>
                                            Hi, I'd like to invite you to join
                                            my group. You can join using the
                                            link in this email.
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_wrapper">
                                      <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_container">
                                        <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_title_wrapper">
                                          <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_title_container">
                                            <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_title">
                                              <span>Add emails to invite</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_content_wrapper">
                                          <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_content_container">
                                            <div className="superAdmin_groups_inviteBtn_modal_content_inviteHeader_content">
                                              <span>
                                                Invite up to 30 people at once
                                                by adding additional emails.
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="superAdmin_groups_inviteBtn_modal_input_wrapper">
                                  <div className="superAdmin_groups_inviteBtn_modal_input_container">
                                    <input
                                      type="text"
                                      value={inputEmail}
                                      onChange={(e) =>
                                        setInputEmail(e.target.value)
                                      }
                                      placeholder="Enter email"
                                      className="superAdmin_groups_inviteBtn_modal_inputBar"
                                    />
                                    <button
                                      onClick={handleAddEmail}
                                      className="superAdmin_groups_inviteBtn_modal_addBtn"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                {error && (
                                  <p className="error-message">{error}</p>
                                )}
                              </div>
                              <div className="superAdmin_groups_inviteBtn_modal_emailPreview_wrapper">
                                <div className="superAdmin_groups_inviteBtn_modal_emailPreview_container">
                                  {emails.length > 0 && (
                                    <div className="superAdmin_groups_inviteBtn_modal_emailPreview">
                                      <p>
                                        {emails.length === 1
                                          ? `${emails.length} Invitee`
                                          : `${emails.length} Invitees`}
                                      </p>
                                      <ul className="superAdmin_groups_inviteBtn_modal_emailList_container">
                                        {emails.map((email, index) => (
                                          <li key={index}>
                                            <div>
                                              <ImMail4 size={30} /> {email}
                                            </div>

                                            <div className="superAdmin_groups_inviteBtn_modal_emailList_remove">
                                              <FaTimes
                                                size={30}
                                                onClick={() =>
                                                  handleRemoveEmail(index)
                                                }
                                              />
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="superAdmin_groups_inviteBtn_modal_sendBtn_wrapper">
                              <div className="superAdmin_groups_inviteBtn_modal_sendBtn_container">
                                <button
                                  onClick={handleSend}
                                  disabled={emails.length === 0}
                                  className="superAdmin_groups_inviteBtn_modal_sendBtn"
                                >
                                  Send
                                </button>
                                <span onClick={closeModal}>Cancel</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="superAdmin_groups_main_col_title_moreBtn_wrapper">
                  <div className="superAdmin_groups_main_col_title_moreBtn_container">
                    <button className="superAdmin_groups_main_col_title_moreBtn">
                      <FaEllipsisH />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="superAdmin_groups_main_col_content">
            <div className="superAdmin_groups_main_topCol">
              <div className="superAdmin_groups_main_topCol_nav_wrapper">
                <nav>
                  <div className="superAdmin_groups_main_topCol_nav_container">
                    <ul className="superAdmin_groups_main_topCol_nav_wrapper">
                      <li
                        onClick={() => handleNavItemClick(1)}
                        className={`superAdmin_groups_main_topCol_nav_container_item ${
                          currentRight === 1 ? "nav_bg_active" : ""
                        }`}
                      >
                        <a
                          href="#"
                          tabIndex="0"
                          className="superAdmin_groups_main_topCol_nav_link"
                        >
                          <div className="superAdmin_groups_main_topCol_nav_item">
                            <div className="superAdmin_groups_main_topCol_nav_img_container">
                              {currentRight === 1 ? (
                                <IoMdHome size={30} color="#fff" />
                              ) : (
                                <IoMdHome size={30} color="#036" />
                              )}
                            </div>
                            <div className="superAdmin_groups_main_topCol_nav_title_container">
                              <h3
                                className={
                                  currentRight === 1 ? "nav_text_active" : ""
                                }
                              >
                                Community Home
                              </h3>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li
                        onClick={() => handleNavItemClick(2)}
                        className={`superAdmin_groups_main_topCol_nav_container_item ${
                          currentRight === 2 ? "nav_bg_active" : ""
                        }`}
                      >
                        <a
                          href="#"
                          tabIndex="0"
                          className="superAdmin_groups_main_topCol_nav_link"
                        >
                          <div className="superAdmin_groups_main_topCol_nav_item">
                            <div className="superAdmin_groups_main_topCol_nav_img_container">
                              {currentRight === 2 ? (
                                <BsStack size={30} color="#fff" />
                              ) : (
                                <BsStack size={30} color="#036" />
                              )}
                            </div>
                            <div className="superAdmin_groups_main_topCol_nav_title_container">
                              <h3
                                className={
                                  currentRight === 2 ? "nav_text_active" : ""
                                }
                              >
                                Overview
                              </h3>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="superAdmin_groups_main_bottomCol">
              <div className="superAdmin_groups_main_bottomCol_nav_wrapper">
                <nav>
                  <div className="superAdmin_groups_main_bottomCol_nav_container">
                    <ul className="superAdmin_groups_main_bottomCol_nav">
                      <li
                        onClick={() => toggleDropdown("adminTools")}
                        className="superAdmin_groups_main_bottomCol_nav_item"
                      >
                        <a href="#">Admin Tools</a> <FaCaretDown color="#036" />
                      </li>
                      {adminToolsDropdown && (
                        <ul className="superAdmin_groups_main_bottomCol_nav_item_dropdown">
                          <li>Item 1</li>
                          <li>Item 2</li>
                        </ul>
                      )}
                      <li
                        onClick={() => toggleDropdown("settings")}
                        className="superAdmin_groups_main_bottomCol_nav_item"
                      >
                        <a href="#">Settings</a> <FaCaretDown color="#036" />
                      </li>
                      {settingsDropdown && (
                        <ul className="superAdmin_groups_main_bottomCol_nav_item_dropdown">
                          {/* Add items for Settings dropdown */}
                          <li>Setting 1</li>
                          <li>Setting 2</li>
                        </ul>
                      )}
                      <li
                        onClick={() => toggleDropdown("insight")}
                        className="superAdmin_groups_main_bottomCol_nav_item"
                      >
                        <a href="#">Insight</a>
                        <FaCaretDown color="#036" />
                      </li>
                      {insightDropdown && (
                        <ul className="superAdmin_groups_main_bottomCol_nav_item_dropdown">
                          {/* Add items for Insight dropdown */}
                          <li>Insight 1</li>
                          <li>Insight 2</li>
                        </ul>
                      )}
                      <li
                        onClick={() => toggleDropdown("support")}
                        className="superAdmin_groups_main_bottomCol_nav_item"
                      >
                        <a href="#">Support</a>
                        <FaCaretDown color="#036" />
                      </li>
                      {supportDropdown && (
                        <ul className="superAdmin_groups_main_bottomCol_nav_item_dropdown">
                          {/* Add items for Support dropdown */}
                          <li>Support 1</li>
                          <li>Support 2</li>
                        </ul>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leftbar;
