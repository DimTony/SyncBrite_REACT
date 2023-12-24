import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CiShare2 } from "react-icons/ci";
import {
  FaUserSecret,
  FaPoll,
  FaEllipsisH,
  FaRegHeart,
  FaRegCommentDots,
} from "react-icons/fa";
import { FaPhotoFilm } from "react-icons/fa6";
import { MdLock, MdPublic } from "react-icons/md";
import axios from "axios";

import "./Discussion.css";

function Discussion({ user, group, setGroup }) {
  const [superAdmin, setSuperAdmin] = useState(null);
  const [groupPrivacyIcon, setGroupPrivacyIcon] = useState(null);
  const [postLikes, setPostLikes] = useState({});
  const [postLiked, setPostLiked] = useState({});
  const [postLikePending, setPostLikePending] = useState({});
  const [posts, setPosts] = useState([]);

  const [postLikesArray, setPostLikesArray] = useState(null);
  const [postComments, setPostComments] = useState();
  const [postCommentsArray, setPostCommentsArray] = useState(null);
  const [cookies] = useCookies([]);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    if (group) {
      if (group.privacy) {
        if (group.privacy === "Public") {
          setGroupPrivacyIcon(<MdPublic size={12} color={"#a6cfff"} />);
        } else if (group.privacy === "Private") {
          setGroupPrivacyIcon(<MdLock size={12} color={"#a6cfff"} />);
        }
      }
    }
  }, [group]);

  useEffect(() => {
    if (group && group.posts) {
      // Initialize likes-related state based on the initial data
      const initialPostLikes = {};
      const initialPostLiked = {};

      group.posts.forEach((post) => {
        initialPostLikes[post._id] = post.likes.length;
        initialPostLiked[post._id] = post.likes.includes(user.id);
      });

      setPostLikes(initialPostLikes);
      setPostLiked(initialPostLiked);
      setPosts(group.posts);
    }
  }, [group, user]);

  const handlePostLikeUnlikeAction = async (postId) => {
    if (postLikePending[postId]) {
      return; // If like action is already pending, do nothing
    }
    setPostLikePending({ ...postLikePending, [postId]: true });

    try {
      const syncToken = cookies.SyncBriteToken;
      // Use Axios for making API calls
      const response = await axios({
        method: "patch",
        url: `https://syncbrite-server.onrender.com/api/groups/posts/like/${group.id}/${postId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${syncToken}`,
        },
        data: {
          action: postLiked[postId] ? "unlike" : "like",
          // Add any other data needed for the like/unlike action
        },
      });

      if (response.status === 200) {
        // Update state variables based on the server response
        setGroup(response.data.group);
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost._id === postId
              ? {
                  ...prevPost,
                  likes: response.data.group.posts.find((p) => p._id === postId)
                    .likes,
                }
              : prevPost
          )
        );
        setPostLiked((prevPostLiked) => ({
          ...prevPostLiked,
          [postId]: !prevPostLiked[postId],
        }));
      } else {
        // Handle error case
        console.error("Failed to update like/unlike status");
      }
    } catch (error) {
      // Handle any Axios-related errors
      console.error("Axios error:", error.message);
    } finally {
      setPostLikePending({ ...postLikePending, [postId]: false });
    }
  };

  return (
    <>
      <div className="superAdmin_groups_rightBottom_discussion_wrapper">
        <div className="superAdmin_groups_rightBottom_discussion_container">
          <div className="superAdmin_groups_rightBottom_discussionLeft_wrapper">
            <div className="superAdmin_groups_rightBottom_discussionLeft_createPost_wrapper">
              <div className="superAdmin_groups_rightBottom_discussionLeft_createPost_container">
                <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_wrapper">
                  <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_container">
                    <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_pPic_wrapper">
                      <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_pPic_container">
                        <img
                          src={user.profilePic}
                          className="superAdmin_groups_rightBottom_discussionLeft_createTop_pPic"
                          alt="profile_img"
                        />
                      </div>
                    </div>
                    <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_modalBtn_wrapper">
                      <div className="superAdmin_groups_rightBottom_discussionLeft_createTop_modalBtn_container">
                        <span>Write something...</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_wrapper">
                  <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_container">
                    <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_wrapper">
                      <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_container">
                        <FaUserSecret />
                        <span>Anonymous Post</span>
                      </div>
                    </div>
                    <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_wrapper">
                      <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_container">
                        <FaPhotoFilm />
                        <span>Photos/Videos</span>
                      </div>
                    </div>
                    <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_wrapper">
                      <div className="superAdmin_groups_rightBottom_discussionLeft_createBottom_btn_container">
                        <FaPoll />
                        <span>Poll</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="superAdmin_groups_rightBottom_discussionLeft_displayPosts_wrapper">
              <div className="superAdmin_groups_rightBottom_discussionLeft_displayPosts_container">
                {posts &&
                  posts.map((post, index) => (
                    <span
                      key={index}
                      id={post._id}
                      className="superAdmin_groups_rightBottom_discussionLeft_item_container"
                    >
                      <div className="superAdmin_groups_rightBottom_discussionLeft_AllPost_wrapper">
                        <div className="superAdmin_groups_rightBottom_discussionLeft_AllPost_container">
                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_wrapper">
                            <div className="superAdmin_groups_rightBottom_discussionLeft_post_container">
                              <div className="superAdmin_groups_rightBottom_discussionLeft_post_item">
                                <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_wrapper">
                                  <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header">
                                    <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_img_wrapper">
                                      <img
                                        src={
                                          post ? (
                                            post.authorData.profilePic
                                          ) : (
                                            <Skeleton />
                                          )
                                        }
                                        className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_img"
                                        alt="event_post_img"
                                      />
                                    </div>
                                    <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_info_wrapper">
                                      <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_info_name_wrapper">
                                        <a
                                          href={`/profile/${
                                            post ? (
                                              post.authorData.userName
                                            ) : (
                                              <Skeleton />
                                            )
                                          }`}
                                        >
                                          {" "}
                                          {post ? (
                                            post.authorData.fullName
                                          ) : (
                                            <Skeleton />
                                          )}
                                        </a>{" "}
                                        <h6>
                                          created the group{" "}
                                          <a
                                            href={`/attendee/groups/${group.id}`}
                                            className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_info_groupName"
                                          >
                                            {group.name}
                                          </a>
                                          .
                                        </h6>
                                      </div>
                                      <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_dateLocation_wrapper">
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_dateLocation">
                                          <span>
                                            {post ? (
                                              post.createdAt
                                            ) : (
                                              <Skeleton />
                                            )}
                                          </span>
                                        </div>
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_dateLocation_icon_wrapper">
                                          &nbsp;•{groupPrivacyIcon}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_btn_wrapper">
                                      <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_btn_container">
                                        <FaEllipsisH
                                          size={20}
                                          className="superAdmin_groups_rightBottom_discussionLeft_post_item_header_btn"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_footer_wrapper">
                                  <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_footer_container">
                                    <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_wrapper">
                                      <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_container">
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_item">
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_like">
                                            {postLikePending[post._id] ? (
                                              <ClipLoader size={10} />
                                            ) : (
                                              post.likes.length
                                            )}{" "}
                                            Likes
                                          </div>
                                        </div>
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_item">
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_comment">
                                            Comments
                                          </div>
                                        </div>
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_item">
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_metrics_share">
                                            {/* {eventInfo ? eventInfo.shares : <Skeleton />}{" "} */}
                                            shares
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btns_wrapper">
                                      <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_container">
                                        <div
                                          onClick={() =>
                                            handlePostLikeUnlikeAction(post._id)
                                          }
                                          className={`superAdmin_groups_rightBottom_discussionLeft_post_item_btn_like_item ${
                                            postLiked[post._id] && "like-active"
                                          }`}
                                        >
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item_name">
                                            {postLikePending[post._id] ? (
                                              <BeatLoader />
                                            ) : post.likes.some(
                                                (like) => like === user.id
                                              ) ? (
                                              <span>
                                                <FaRegHeart size={20} /> Liked
                                              </span>
                                            ) : (
                                              <span>
                                                <FaRegHeart size={20} /> Like
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item">
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item_icon">
                                            <FaRegCommentDots size={20} />
                                          </div>
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item_name">
                                            Comment
                                          </div>
                                        </div>
                                        <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item">
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item_icon">
                                            <CiShare2 size={20} />
                                          </div>
                                          <div className="superAdmin_groups_rightBottom_discussionLeft_post_item_btn_item_name">
                                            Share
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
                      </div>
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="superAdmin_groups_rightBottom_discussionRight_wrapper">
            bottom_right
          </div>
        </div>
      </div>
    </>
  );
}

export default Discussion;
