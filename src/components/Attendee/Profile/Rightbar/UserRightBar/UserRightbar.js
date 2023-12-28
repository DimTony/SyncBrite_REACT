import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import BeatLoader from "react-spinners/BeatLoader";
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
import axios from "axios";
import profilePicPlaceholder from "../../../../../images/placeholder.png";
import coverPicPlaceholder from "../../../../../images/cover-placeholder.jpg";
import EditProfileModal from "../../Edit/EditProfile";
import EditProfilePictureModal from "../../Edit/ProfilePicEditModal";
import CoverPicEditModal from "../../Edit/CoverPicEditModal";
import ViewProfilePicModal from "../../View/ViewProfilePicModal";
import ViewCoverPicModal from "../../View/ViewCoverPicModal";

function UserRightbar({ user, friend }) {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [viewProfileModal, setViewProfileModal] = useState(false);
  const [coverView, setCoverView] = useState(false);
  const [editCoverModal, setEditCoverModal] = useState(false);
  const [editSecModal, setEditSecModal] = useState(false);
  const [addFriendPending, setAddFriendPending] = useState(false);
  const [followPending, setFollowPending] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [friendUserId, setFriendUserId] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(false);
  const [addedFriend, setAddedFriend] = useState(false);
  const [friendStatus, setFriendStatus] = useState(null);
  const [friends, setFriends] = useState(null);
  const [following, setFollowing] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followStatus, setFollowStatus] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [picChanged, setPicChanged] = useState(false);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [coverPicHover, setCoverPicHover] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const toggleEditSecModal = () => {
    setEditSecModal(!editSecModal);
  };

  if (editSecModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const toggleViewModal = () => {
    setViewProfileModal(!viewProfileModal);
  };

  const toggleCoverView = () => {
    setCoverView(!coverView);
  };

  const handlePicMouseOver = () => {
    setProfilePicHover(true);
  };

  const handlePicMouseOut = () => {
    setProfilePicHover(false);
  };

  useEffect(() => {
    if (friend && user) {
      const currentUserId = user.id;

      if (friend.friends) {
        setFriends(friend.friends.length);
      }
      if (friend.following) {
        setFollowing(friend.following.length);
      }
      if (friend.followers) {
        setFollowers(friend.followers.length);
      }

      if (friend.friends && friend.friends.includes(currentUserId)) {
        setFriendStatus("Unfriend");
      } else if (
        friend.sentFriendRequests &&
        friend.sentFriendRequests.includes(currentUserId)
      ) {
        setFriendStatus("Pending");
      } else if (
        friend.receivedFriendRequests &&
        friend.receivedFriendRequests.includes(currentUserId)
      ) {
        setFriendStatus("Cancel Request");
      } else {
        setFriendStatus("Add Friend");
      }

      if (
        friend.following &&
        friend.following.includes(currentUserId) &&
        !friend.followers.includes(currentUserId)
      ) {
        setFollowStatus("Follow Back");
      } else if (friend.followers && friend.followers.includes(currentUserId)) {
        setFollowStatus("Unfollow");
      } else {
        setFollowStatus("Follow");
      }
    }
  }, [friend, user]);

  const friendUnfriendAction = async () => {
    setAddFriendPending(true);
    const syncToken = cookies.SyncBriteToken;

    try {
      const currentUserId = user.id;
      const userId = friend.id;
      let valueToSend = "";

      if (friendStatus === "Add Friend") {
        valueToSend = "friend";
      } else if (friendStatus === "Unfriend") {
        valueToSend = "unfriend";
      } else if (friendStatus === "Cancel Request") {
        valueToSend = "cancel";
      }

      const response = await axios.patch(
        `https://syncbrite.onrender.com/api/profiles/friend/request/${userId}`,
        { value: valueToSend },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${syncToken}` },
        }
      );
      const { currentUser, friendUser } = response.data.updatedUser;

      if (
        friendUser.friends &&
        friendUser.sentFriendRequests &&
        friendUser.receivedFriendRequests
      ) {
        setFriends(friendUser.friends.length);

        if (friendUser.friends.includes(currentUserId)) {
          setFriendStatus("Unfriend");
        } else if (friendUser.sentFriendRequests.includes(currentUserId)) {
          setFriendStatus("Pending");
        } else if (friendUser.receivedFriendRequests.includes(currentUserId)) {
          setFriendStatus("Cancel Request");
        } else {
          setFriendStatus("Add Friend");
        }
      }

      setAddFriendPending(false);
    } catch (error) {
      console.error("Error during friend/unfriend action", error);
      setAddFriendPending(false);
    }
  };

  const acceptFriendRequest = async () => {
    setAddFriendPending(true);
    const currentUserId = user.id;
    const userId = friend.id;
    const syncToken = cookies.SyncBriteToken;
    try {
      const response = await axios.patch(
        `https://syncbrite.onrender.com/api/profiles/friend/${userId}`,
        { value: "accept" },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${syncToken}` },
        }
      );

      const { currentUser, friendUser } = response.data.updatedUser;

      if (
        friendUser.friends &&
        friendUser.sentFriendRequests &&
        friendUser.receivedFriendRequests
      ) {
        setFriends(friendUser.friends.length);

        if (friendUser.friends.includes(currentUserId)) {
          setFriendStatus("Unfriend");
        } else if (friendUser.sentFriendRequests.includes(currentUserId)) {
          setFriendStatus("Pending");
        } else if (friendUser.receivedFriendRequests.includes(currentUserId)) {
          setFriendStatus("Cancel Request");
        } else {
          setFriendStatus("Add Friend");
        }
      }
    } catch (error) {
      console.error("Error during accepting friend request", error);
    } finally {
      setAddFriendPending(false);
    }
  };

  const declineFriendRequest = async () => {
    setAddFriendPending(true);
    const currentUserId = user.id;
    const userId = friend.id;
    const syncToken = cookies.SyncBriteToken;
    try {
      const response = await axios.patch(
        `https://syncbrite.onrender.com/api/profiles/friend/${userId}`,
        { value: "decline" },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${syncToken}` },
        }
      );

      const { currentUser, friendUser } = response.data.updatedUser;

      if (
        friendUser.friends &&
        friendUser.sentFriendRequests &&
        friendUser.receivedFriendRequests
      ) {
        setFriends(friendUser.friends.length);

        if (friendUser.friends.includes(currentUserId)) {
          setFriendStatus("Unfriend");
        } else if (friendUser.sentFriendRequests.includes(currentUserId)) {
          setFriendStatus("Pending");
        } else if (friendUser.receivedFriendRequests.includes(currentUserId)) {
          setFriendStatus("Cancel Request");
        } else {
          setFriendStatus("Add Friend");
        }
      }
    } catch (error) {
      console.error("Error during accepting friend request", error);
    } finally {
      setAddFriendPending(false);
    }
  };

  const followUnfollowAction = async () => {
    setFollowPending(true);
    const syncToken = cookies.SyncBriteToken;

    try {
      const currentUserId = user.id;
      const userId = friend.id;
      let valueToSend = "";

      // Ensure followStatus is a valid value
      if (["Follow", "Follow Back", "Unfollow"].includes(followStatus)) {
        if (followStatus === "Follow") {
          valueToSend = "follow";
        } else if (followStatus === "Follow Back") {
          valueToSend = "follow back";
        } else if (followStatus === "Unfollow") {
          valueToSend = "unfollow";
        }
      } else {
        console.error("Invalid followStatus:", followStatus);
        setFollowPending(false);
        return;
      }

      const response = await axios.patch(
        `https://syncbrite.onrender.com/api/profiles/follow/${userId}`,
        { value: valueToSend },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${syncToken}` },
        }
      );

      // Check for errors in the API response
      if (response.data && response.data.updatedUsers) {
        const { currentUser, friendUser } = response.data.updatedUsers;

        if (friendUser.following && friendUser.followers) {
          setFollowers(friendUser.followers.length);
          setFollowing(friendUser.following.length);

          if (friendUser.followers.includes(currentUserId)) {
            setFollowStatus("Unfollow");
          } else if (
            friendUser.following.includes(currentUserId) &&
            !friendUser.followers.includes(currentUserId)
          ) {
            setFollowStatus("Follow Back");
          } else {
            setFollowStatus("Follow");
          }
        } else {
          setFollowStatus("Follow");
          // Handle cases where 'followers' or 'following' properties are missing or not arrays
          console.error("Invalid 'friendUser' object structure");
          // Set a default follow status or handle the error as appropriate
        }
      } else {
        console.error("Invalid API response structure:", response.data);
        // Handle the error as appropriate
      }

      setFollowPending(false);
    } catch (error) {
      console.error("Error during follow/unfollow action", error);
      setFollowPending(false);
      // Handle the error as appropriate
    } finally {
      setFollowPending(false);
    }
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
                    <div className="rightbar_profile_cover_container">
                      <div
                        onClick={toggleCoverView}
                        className="rightbar_profile_cover_link"
                      >
                        <img
                          src={friend ? friend.coverPic : coverPicPlaceholder}
                          className="rightbar_profile_cover_img"
                          alt="siderbar_logo_img"
                        />
                      </div>
                    </div>
                    {coverView && (
                      <ViewCoverPicModal
                        user={friend}
                        coverView={coverView}
                        setCoverView={setCoverView}
                      />
                    )}
                  </div>
                  <div
                    onClick={toggleViewModal}
                    className="rightbar_profile_otheruser_img_container"
                  >
                    <img
                      src={friend ? friend.profilePic : profilePicPlaceholder}
                      className="rightbar_profile_img"
                      alt="profile_banner_logo_img"
                    />
                  </div>

                  {viewProfileModal && (
                    <ViewProfilePicModal
                      user={friend}
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
                            <h1>{friend ? friend.fullName : "Loading..."}</h1>
                          </div>
                          <div className="rightbar_profile_info_friend_metrics_wrapper">
                            <div className="rightbar_profile_info_followers_wrapper">
                              {addFriendPending ? (
                                <>
                                  <BeatLoader /> Friends
                                </>
                              ) : (
                                <>
                                  {friends}{" "}
                                  {friends === 1 ? "Friend" : "Friends"}
                                </>
                              )}
                            </div>
                            <div className="rightbar_profile_info_followers_wrapper">
                              {followPending ? (
                                <>
                                  <BeatLoader /> Followers
                                </>
                              ) : (
                                <>
                                  {followers}{" "}
                                  {followers === 1 ? "Follower" : "Followers"}
                                </>
                              )}
                            </div>
                            <div className="rightbar_profile_info_following_wrapper">
                              {following} Following
                            </div>
                          </div>
                        </div>

                        <div className="rightbar_profile_info_cta">
                          <div className="rightbar_profile_otheruser_cta_wrapper">
                            <div className="rightbar_profile_otheruser_cta_item">
                              <div className="rightbar_profile_otheruser_addfriend_btn">
                                <div
                                  onClick={friendUnfriendAction}
                                  className="rightbar_profile_friend_btns_wrapper"
                                >
                                  {friendStatus === "Pending" ? (
                                    <div className="rightbar_profile_pendingfriend_btn_wrapper">
                                      <button
                                        onClick={acceptFriendRequest}
                                        className="rightbar_profile_pendingfriend_btn"
                                      >
                                        Accept Friend Request
                                      </button>
                                      <button
                                        onClick={declineFriendRequest}
                                        className="rightbar_profile_pendingfriend_btn"
                                      >
                                        Decline Friend Request
                                      </button>
                                    </div>
                                  ) : (
                                    <button className="rightbar_profile_friend_btn">
                                      {friendStatus}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="rightbar_profile_otheruser_cta_item">
                              <div className="rightbar_profile_otheruser_follow_btn">
                                <button
                                  onClick={followUnfollowAction}
                                  className="rightbar_profile_otheruser_cta_btn"
                                >
                                  {followPending ? (
                                    <div>
                                      <BeatLoader />
                                    </div>
                                  ) : (
                                    <div>{followStatus}</div>
                                  )}
                                </button>
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
                          <span>{friend ? friend.pronouns : ""}</span>
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
                        <span>{friend ? friend.bio : ""}</span>
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
                          <span>{friend ? friend.location : ""}</span>
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
                          <span>{friend ? friend.interests : ""}</span>
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

export default UserRightbar;
