import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "react-loading-skeleton/dist/skeleton.css";
import "../../Dashboard/Profile.css";
import "../Rightbar.css";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  MdEdit,
  MdOutlineClose,
  MdPhoto,
  MdPreview,
  MdOutlineCameraAlt,
} from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import profilePicPlaceholder from "../../../../../images/placeholder.png";
import coverPicPlaceholder from "../../../../../images/cover-placeholder.jpg";
import EditProfileModal from "../../Edit/EditProfile";
import EditProfilePictureModal from "../../Edit/ProfilePicEditModal";
import CoverPicEditModal from "../../Edit/CoverPicEditModal";
import ViewProfilePicModal from "../../View/ViewProfilePicModal";
import ViewCoverPicModal from "../../View/ViewCoverPicModal";

function LoggedInRightbar({ user }) {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [viewProfileModal, setViewProfileModal] = useState(false);
  const [coverView, setCoverView] = useState(false);
  const [editCoverModal, setEditCoverModal] = useState(false);
  const [editSecModal, setEditSecModal] = useState(false);
  const [picChanged, setPicChanged] = useState(false);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [coverPicHover, setCoverPicHover] = useState(false);
  const [friends, setFriends] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    if (user) {
      if (user.friends) {
        setFriends(user.friends.length);
      }
      if (user.following) {
        setFollowing(user.following.length);
      }
      if (user.followers) {
        setFollowers(user.followers.length);
      }
    }
  });

  const toggleEditSecModal = () => {
    setEditSecModal(!editSecModal);
  };

  if (editSecModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const togglePicEditModal = () => {
    setEditProfileModal(!editProfileModal);
  };

  const toggleViewModal = () => {
    setViewProfileModal(!viewProfileModal);
  };

  const toggleCoverView = () => {
    setCoverView(!coverView);
  };

  const toggleCoverEditModal = () => {
    setEditCoverModal(!editCoverModal);
  };

  const handlePicMouseOver = () => {
    setProfilePicHover(true);
  };

  const handlePicMouseOut = () => {
    setProfilePicHover(false);
  };
  const handleCoverMouseOver = () => {
    setCoverPicHover(true);
  };

  const handleCoverMouseOut = () => {
    setCoverPicHover(false);
  };

  return (
    <>
      <div className="rightbar_wrapper">
        <div className="rightbar">
          <div className="rightbar_dashboard_menu">
            <div className="rightbar_col_banner">
              <div className="dashbar">
                <div className="rightbar_profile_banner">
                  <div className="rightbar_profile_cover_wrapper">
                    <div
                      onMouseOver={handleCoverMouseOver}
                      onMouseOut={handleCoverMouseOut}
                      className="rightbar_profile_cover_container"
                    >
                      <div
                        onClick={toggleCoverView}
                        className="rightbar_profile_cover_link"
                      >
                        <img
                          src={user ? user.coverPic : coverPicPlaceholder}
                          className="rightbar_profile_cover_img"
                          alt="siderbar_logo_img"
                        />
                      </div>

                      {coverPicHover && (
                        <div className="rightbar_cover_img_btn">
                          <div className="rightbar_profile_info_cta">
                            <button
                              onClick={toggleCoverEditModal}
                              className="rightbar_cover_img_edit_btn"
                            >
                              <MdPhoto />
                              &nbsp; Edit Cover
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {coverView && (
                      <ViewCoverPicModal
                        user={user}
                        coverView={coverView}
                        setCoverView={setCoverView}
                      />
                    )}
                    {editCoverModal && (
                      <CoverPicEditModal
                        user={user}
                        editCoverModal={editCoverModal}
                        setEditCoverModal={setEditCoverModal}
                      />
                    )}
                  </div>
                  <div
                    onMouseOver={handlePicMouseOver}
                    onMouseOut={handlePicMouseOut}
                    className="rightbar_profile_img_container"
                  >
                    <img
                      src={user ? user.profilePic : profilePicPlaceholder}
                      className="rightbar_profile_img"
                      alt="profile_banner_logo_img"
                    />
                    {/* profilePicHover */}
                    {profilePicHover && (
                      <div className="rightbar_profile_img_btns">
                        <div className="rightbar_profile_info_cta">
                          <button
                            onClick={togglePicEditModal}
                            className="rightbar_profile_img_edit_btn"
                          >
                            <MdOutlineCameraAlt />
                            &nbsp; Edit
                          </button>
                        </div>

                        <div className="rightbar_profile_info_cta">
                          <button
                            onClick={toggleViewModal}
                            className="rightbar_profile_img_view_btn"
                          >
                            <MdPreview />
                            &nbsp; View
                          </button>
                        </div>
                      </div>
                    )}
                    {/* profilePicHover end */}
                  </div>

                  {editProfileModal && (
                    <EditProfilePictureModal
                      user={user}
                      editProfileModal={editProfileModal}
                      setEditProfileModal={setEditProfileModal}
                      setPicChanged={setPicChanged}
                    />
                  )}

                  {viewProfileModal && (
                    <ViewProfilePicModal
                      user={user}
                      viewProfileModal={viewProfileModal}
                      setViewProfileModal={setViewProfileModal}
                    />
                  )}

                  <div className="rightbar_profile_info_wrapper">
                    <div className="rightbar_profile_info_container">
                      <div className="rightbar_profile_info_noise"></div>
                      <div className="rightbar_profile_info_holder">
                        <div className="rightbar_profile_info_display_wrapper">
                          <div className="rightbar_profile_info_name">
                            <h1>{user ? user.fullName : "Loading..."}</h1>
                          </div>
                          <div className="rightbar_profile_info_friend_metrics_wrapper">
                            <div className="rightbar_profile_info_followers_wrapper">
                              {friends} {friends === 1 ? "Friend" : "Friends"}
                            </div>
                            <div className="rightbar_profile_info_followers_wrapper">
                              {followers}{" "}
                              {followers === 1 ? "Follower" : "Followers"}
                            </div>
                            <div className="rightbar_profile_info_following_wrapper">
                              {following} Following
                            </div>
                          </div>
                        </div>

                        <div className="rightbar_profile_info_cta">
                          <button
                            onClick={toggleEditSecModal}
                            className="rightbar_profile_info_cta_btn"
                          >
                            <MdEdit />
                            &nbsp;Edit Profile
                          </button>
                        </div>
                        {editSecModal && (
                          <EditProfileModal
                            user={user}
                            editSecModal={editSecModal}
                            setEditSecModal={setEditSecModal}
                            setPicChanged={setPicChanged}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rightbar_col_bottom">
              <div className="rightbar_col_container">
                <div className="rightbar_col_main">
                  <div className="rightbar_col_main_item">
                    <div className="rightbar_col_main_item_header">
                      <div className="rightbar_col_main_item_header_img_holder">
                        <img
                          src={profilePicPlaceholder}
                          alt="siderbar_logo_img"
                          className="rightbar_col_main_item_header_img"
                        />
                      </div>
                      <div className="rightbar_col_main_item_header_title_holder">
                        <div className="rightbar_col_main_item_header_title">
                          <div className="rightbar_col_main_item_header_title_name">
                            Profile Name
                          </div>
                          <div className="rightbar_col_main_item_header_title_info">
                            2/2/1991 There
                          </div>
                        </div>
                      </div>
                      <div className="rightbar_col_main_item_header_more_btn_holder">
                        <div className="rightbar_col_main_item_header_more_btn">
                          <HiDotsHorizontal />
                        </div>
                      </div>
                      <div className="rightbar_col_main_item_header_close_btn_holder">
                        <div className="rightbar_col_main_item_header_close_btn">
                          <MdOutlineClose />
                        </div>
                      </div>
                    </div>
                    <div className="rightbar_col_main_item_content_holder">
                      <div className="rightbar_col_main_item_content">
                        <div className="rightbar_col_main_item_content_text_holder">
                          <div className="rightbar_col_main_item_content_text">
                            {/* Lorem ipsum */}
                          </div>
                        </div>
                        <div className="rightbar_col_main_item_content_img_holder">
                          <img
                            src={coverPicPlaceholder}
                            className="rightbar_col_main_item_content_img"
                            alt="profile_banner_logo_img"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="rightbar_col_main_item_metrics">
                      <div className="rightbar_col_main_item_metrics_container">
                        <div className="rightbar_col_main_item_metrics_like">
                          2 Likes
                        </div>
                        <div className="rightbar_col_main_item_metrics_comment">
                          3 Comments
                        </div>
                        <div className="rightbar_col_main_item_metrics_share">
                          4 shares
                        </div>
                      </div>
                    </div>
                    <div className="rightbar_col_main_item_ctas">
                      <div className="rightbar_col_main_item_ctas_item">
                        <div className="rightbar_col_main_item_ctas_item_icon">
                          <FaRegHeart />
                        </div>
                        <div className="rightbar_col_main_item_ctas_item_name">
                          Like
                        </div>
                      </div>
                      <div className="rightbar_col_main_item_ctas_item">
                        <div className="rightbar_col_main_item_ctas_item_icon">
                          <FaRegCommentDots />
                        </div>
                        <div className="rightbar_col_main_item_ctas_item_name">
                          Coment
                        </div>
                      </div>
                      <div className="rightbar_col_main_item_ctas_item">
                        <div className="rightbar_col_main_item_ctas_item_icon">
                          <CiShare2 />
                        </div>
                        <div className="rightbar_col_main_item_ctas_item_name">
                          Share
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rightbar_col_side">
                  <div className="rightbar_col_side_info">
                    <div className="rightbar_col_side_info">
                      <h2>Intro</h2>
                    </div>
                    <div className="rightbar_col_side_info">
                      <div className="rightbar_col_side_info_item">
                        <div className="rightbar_col_side_info_item_header">
                          <div className="rightbar_col_side_info_item_name">
                            <p>Pronouns</p>
                          </div>
                          <div className="rightbar_col_side_info_item_icon">
                            <MdEdit />
                          </div>
                        </div>
                        <div>
                          <span>{user ? user.pronouns : ""}</span>
                        </div>
                      </div>
                    </div>
                    <div className="rightbar_col_side_info">
                      <div className="rightbar_col_side_info_item">
                        <div className="rightbar_col_side_info_item_header">
                          <div className="rightbar_col_side_info_item_name">
                            <p>Bio</p>
                          </div>
                          <div className="rightbar_col_side_info_item_icon">
                            <MdEdit />
                          </div>
                        </div>
                      </div>
                      <div>
                        <span>{user ? user.bio : ""}</span>
                      </div>
                    </div>
                    <div className="rightbar_col_side_info">
                      <div className="rightbar_col_side_info_item">
                        <div className="rightbar_col_side_info_item_header">
                          <div className="rightbar_col_side_info_item_name">
                            <p>Location</p>
                          </div>
                          <div className="rightbar_col_side_info_item_icon">
                            <MdEdit />
                          </div>
                        </div>
                        <div>
                          <span>{user ? user.location : ""}</span>
                        </div>
                      </div>
                    </div>
                    <div className="rightbar_col_side_info">
                      <div className="rightbar_col_side_info_item">
                        <div className="rightbar_col_side_info_item_header">
                          <div className="rightbar_col_side_info_item_name">
                            <p>Interests</p>
                          </div>
                          <div className="rightbar_col_side_info_item_icon">
                            <MdEdit />
                          </div>
                        </div>
                        <div>
                          <span>{user ? user.interests : ""}</span>
                        </div>
                      </div>
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

export default LoggedInRightbar;
