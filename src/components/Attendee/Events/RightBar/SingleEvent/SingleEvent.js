import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { BiDetail } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { FaEllipsisH, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import {
  MdModeEdit,
  MdOutlineMail,
  MdArrowDropDown,
  MdPeople,
  MdPerson,
  MdLocationOn,
  MdLock,
  MdGroups3,
  MdPublic,
  MdOutlineHandshake,
} from "react-icons/md";
import axios from "axios";
import "../../Events.css";
import "./SingleEvent.css";
import AttendeeNavbar from "../../../Navbar/AttendeeNavbar";
import Leftbar from "../../LeftBar/Leftbar";
import refetchEventInfo from "../../../../../helpers/refetchEventInfo";

function SingleEvent() {
  const [data, setData] = useState({
    eventName: "",
    eventStartDate: "",
    eventStartTime: "",
    eventEndDate: "",
    eventEndTime: "",
    details: "",
    eventLocation: "",
    link: "",
    visibility: "",
    visibilityGroup: "",
    eventType: "",
    selectedGroups: [],
    coHostEmail: "",
    repeatType: "",
    repeatDate: "",
    repeatTime: "",
    customDates: [],
    bannerImage: "",
  });
  const [likePending, setLikePending] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState();
  const [likesArray, setLikesArray] = useState(null);
  const [eventInfo, setEventInfo] = useState(null);
  const [eventID, setEventID] = useState(null);
  const [eventBanner, setEventBanner] = useState(null);
  const [eventStartDate, setEventStartDate] = useState([]);
  const [eventEndDate, setEventEndDate] = useState([]);
  const [eventRepeatDate, setEventRepeatDate] = useState([]);
  const [eventCustomDates, setEventCustomDates] = useState([]);
  const [eventGoing, setEventGoing] = useState(null);
  const [eventInterested, setEventInterested] = useState(null);
  const [eventCantGo, setEventCantGo] = useState(null);
  const [eventTypeIcon, setEventTypeIcon] = useState(null);
  const [eventTypePostIcon, setEventTypePostIcon] = useState(null);
  const [eventTypeText, setEventTypeText] = useState(null);
  const [eventCreationText, setEventCreationText] = useState(null);
  const [eventHost, setEventHost] = useState(null);
  const [updatedEventInfo, setUpdatedEventInfo] = useState(null);
  const [eventHostId, setEventHostId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cookies] = useCookies([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const fetchData = async () => {
      const syncToken = cookies.SyncBriteToken;
      const url = window.location.href;
      const eventIdMatch = url.match(/\/attendee\/events\/([^/]+)/);

      if (eventIdMatch) {
        try {
          if (!syncToken) {
            navigate("/login");
            return;
          }

          const eventId = eventIdMatch[1];
          setEventID(eventId);

          const response = await axios.get(
            `http://localhost:8080/api/events/${eventId}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            const eventData = response.data.event;
            const user = response.data.user;
            const eventLikesArray = response.data.event.likes;
            setEventInfo(eventData);
            setUserData(user);
            setUserId(user.id);
            setLikesArray(eventLikesArray);
            setLikes(eventLikesArray.length);
          } else {
            generateError(
              "Failed to authenticate the user.\n REDIRECTING TO LOGIN..."
            );
            console.error("Failed to authenticate the user");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.data.message === "jwt expired") {
                generateError(
                  `${error.response.data.message}, REDIRECTING TO LOGIN PAGE...`
                );
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              }

              generateError(
                `${error.response.data.message}, PLEASE TRY AGAIN LATER...`
              );
            } else if (error.request) {
              generateError("BAD REQUEST");

              console.error(
                "No response received. Request details:",
                error.request
              );
            } else {
              generateError("REQUEST SETUP ERROR");

              console.error(
                "Request setup error. Error message:",
                error.message
              );
            }
          } else {
            generateError("INTERNAL SERVER ERROR");
            console.error("Non-Axios error. Error message:", error?.message);
          }
        }
      } else {
        navigate("/attendee/dashboard");
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (eventInfo) {
      if (eventInfo.visibility) {
        if (eventInfo.visibility === "Public") {
          setEventTypeText("This event is for all");
          setEventTypeIcon(<MdPublic size={30} color={"#a6cfff"} />);
          setEventTypePostIcon(<MdPublic size={15} />);
          setEventCreationText("public");
        } else if (eventInfo.visibility === "Private") {
          setEventTypeText("Only people who are invited");
          setEventTypeIcon(<MdLock size={30} color={"#a6cfff"} />);
          setEventTypePostIcon(<MdLock size={15} />);
          setEventCreationText("private");
        } else if (eventInfo.visibility === "Friends") {
          setEventTypeText("Only my friends are invited");
          setEventTypeIcon(<MdOutlineHandshake size={30} color={"#a6cfff"} />);
          setEventTypePostIcon(<MdOutlineHandshake size={15} />);
          setEventCreationText("friends");
        } else if (eventInfo.visibility === "Group") {
          setEventTypeText(`Only people in: ${eventInfo.selectedGroups}`);
          setEventTypeIcon(<MdGroups3 size={30} color={"#a6cfff"} />);
          setEventTypePostIcon(<MdGroups3 size={15} />);
          setEventCreationText("group");
        }
      }

      if (
        eventInfo.bannerImage &&
        eventInfo.bannerImage !== "https://placehold.co/640x374"
      ) {
        setEventBanner(eventInfo.bannerImage);
      }

      if (eventInfo.going >= 1) {
        setEventGoing(eventInfo.going);
      }

      if (eventInfo.interested > 0) {
        setEventInterested(eventInfo.interested);
      } else {
        setEventInterested(null);
      }

      if (eventInfo.eventStartDate) {
        setEventStartDate(eventInfo.eventStartDate);
      } else {
        setEventStartDate(null);
      }

      if (eventInfo.eventEndDate) {
        setEventEndDate(eventInfo.eventEndDate);
      } else {
        setEventEndDate(null);
      }

      if (
        eventInfo.repeatDate &&
        !eventInfo.repeatDate.some(
          (item) => item === undefined || isNaN(item) || item === null
        )
      ) {
        setEventRepeatDate(eventInfo.repeatDate);
      } else {
        setEventRepeatDate(null);
      }

      if (eventInfo.customDates) {
        setEventCustomDates(eventInfo.customDates);
      } else {
        setEventCustomDates(null);
      }

      if (eventInfo.cantGo > 0) {
        setEventCantGo(eventInfo.cantGo);
      } else {
        setEventCantGo(null);
      }

      if (eventInfo.userId) {
        const fetchHostData = async () => {
          const syncToken = cookies.SyncBriteToken;

          try {
            if (!syncToken) {
              navigate("/login");
              return;
            }

            const response = await axios.get(
              `http://localhost:8080/api/users/${eventInfo.userId}`,
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${syncToken}`,
                },
              }
            );

            if (response.status === 200) {
              const host = response.data.user;
              setEventHost(host);
            } else {
              generateError("FAILED TO FETCH EVENT HOST.\n REDIRECTING...");
              console.error("FAILED TO FETCH EVENT HOST");
              setTimeout(() => {
                navigate("/attendee/events");
              }, 3000);
            }
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                if (error.response.data.message === "jwt expired") {
                  generateError(
                    "SESSION TIMED-OUT, REDIRECTING TO LOGIN PAGE..."
                  );
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                }

                if (error.response.data.message === "User Not Found") {
                  generateError("User Not Found. Redirecting...");
                  setTimeout(() => {
                    navigate("/attendee/events");
                  }, 3000);
                }

                generateError(
                  `${error.response.data.message}, PLEASE TRY AGAIN LATER...`
                );
              } else if (error.request) {
                generateError("BAD REQUEST");

                console.error(
                  "No response received. Request details:",
                  error.request
                );
              } else {
                generateError("REQUEST SETUP ERROR");

                console.error(
                  "Request setup error. Error message:",
                  error.message
                );
              }
            } else {
              generateError("INTERNAL SERVER ERROR");
              console.error("Non-Axios error. Error message:", error?.message);
            }
          }
        };
        fetchHostData();
      } else {
        generateError("FAILED TO FETCH EVENT HOST.\n REDIRECTING...");
        console.error("FAILED TO FETCH EVENT HOST");
        setTimeout(() => {
          navigate("/attendee/events");
        }, 3000);
      }

      if (likesArray) {
        const isLiked = likesArray.some(
          (like) => like.user === userId.toString()
        );

        setLiked(isLiked);
      }
    }
  }, [eventInfo, likesArray, userId]);

  const eventDatekeys = [
    "original",
    "originalCap",
    "formattedDate",
    "year",
    "monthShortName",
    "day",
  ];

  const StartDate = eventStartDate
    ? Object.fromEntries(
        eventDatekeys.map((key, index) => [key, eventStartDate[index]])
      )
    : null;

  const EndDate = eventEndDate
    ? Object.fromEntries(
        eventDatekeys.map((key, index) => [key, eventEndDate[index]])
      )
    : null;

  const RepeatDate = eventRepeatDate
    ? Object.fromEntries(
        eventDatekeys.map((key, index) => [key, eventRepeatDate[index]])
      )
    : null;

  const customDatesResult = {};

  for (let i = 0; i < eventCustomDates.length; i++) {
    for (let j = 0; j < eventCustomDates[i].length; j++) {
      if (eventCustomDates[i][j] !== null) {
        const key = `item_${i}_${j}`;
        customDatesResult[key] = eventCustomDates[i][j];
      }
    }
  }

  const likeUnlikeAction = async () => {
    setLikePending(!likePending);
    setLiked((prevLiked) => !prevLiked); // Use the previous state
    const likeValueToSend = !liked ? "like" : "unlike";
    const syncToken = cookies.SyncBriteToken;
    const url = window.location.href;
    const eventIdMatch = url.match(/\/attendee\/events\/([^/]+)/);
    const eventId = eventIdMatch[1];

    try {
      const response = await axios.patch(
        `http://localhost:8080/api/events/like/${eventId}`,
        { value: likeValueToSend },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${syncToken}` },
        }
      );

      if (response.status !== 200) {
        generateError("FAILED TO LIKE EVENT");
        console.error("FAILED TO LIKE EVENT");
        setLikePending(false);
      } else {
        const likesArray = response.data.likes;
        setLikes(likesArray.length);
        setLikePending(false);
      }
    } catch (error) {
      console.error("Error making the request", error);
      setLikePending(false);
    }
  };

  return (
    <>
      {userData ? (
        <div className="notifications_main_container">
          <AttendeeNavbar userData={userData} />

          <div className="notifications_hero_container">
            <ToastContainer />
            <div className="left">
              <Leftbar data={data} setData={setData} />
            </div>
            <div className="righter">
              <div className="single_event_wrapper">
                <div className="single_event_container">
                  <div className="single_event_main_col">
                    <div className="single_event_main_top">
                      <div className="single_event_main_top_date_wrapper">
                        <div className="single_event_main_top_date_container">
                          <div className="single_event_main_top_date_item">
                            <div className="single_event_main_top_date_month">
                              <h2>{StartDate.monthShortName}</h2>
                            </div>
                            <div className="single_event_main_top_date_day">
                              <h2>{StartDate.day}</h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="single_event_main_top_info_wrapper">
                        <div className="single_event_main_top_info_container">
                          <div className="single_event_main_top_info_item">
                            <div className="single_event_main_top_info_date">
                              <span>{StartDate.originalCap}</span>
                            </div>
                            <div className="single_event_main_top_info_eventName">
                              <span>
                                {eventInfo ? eventInfo.eventName : <Skeleton />}
                              </span>
                            </div>
                            <div className="single_event_main_top_info_linkLocation">
                              <span>
                                {eventInfo ? (
                                  eventInfo.eventLocation
                                ) : (
                                  <Skeleton />
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="single_event_main_top_divider_wrapper">
                        <div className="single_event_main_top_divider_container">
                          <div className="single_event_main_top_divider_btn_container">
                            <button className="single_event_main_top_divider_invite_btn">
                              <MdOutlineMail />
                              &nbsp;Invite&nbsp;
                              <MdArrowDropDown size={30} />
                            </button>
                            <button className="single_event_main_top_divider_edit_btn">
                              <MdModeEdit />
                              &nbsp;Edit
                            </button>
                            <button className="single_event_main_top_divider_more_btn">
                              <FaEllipsisH />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="single_event_main_bottom">
                      <div className="single_event_main_bottom_wrapper">
                        <div className="single_event_main_bottom_container">
                          <div className="single_event_main_bottom_left_wrapper">
                            <div className="single_event_main_bottom_left_details_wrapper">
                              <div className="single_event_main_bottom_left_details_container">
                                <div className="single_event_main_bottom_left_details_title">
                                  <span>Details</span>
                                </div>
                                <div className="single_event_main_bottom_left_details_attendance_wrapper">
                                  <div className="single_event_main_bottom_left_details_attendance_icon_wrapper">
                                    <MdPeople size={30} color={"#a6cfff"} />
                                  </div>
                                  <div className="single_event_main_bottom_left_details_attendance_info_wrapper">
                                    <span>
                                      {eventGoing} person going, including{" "}
                                      {eventHost ? (
                                        eventHost.fullName
                                      ) : (
                                        <Skeleton />
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="single_event_main_bottom_left_details_hostImg_wrapper">
                                  <div className="single_event_main_bottom_left_details_hostImg_icon_wrapper"></div>
                                  <div className="single_event_main_bottom_left_details_hostImg_container">
                                    <img
                                      src={
                                        eventHost ? (
                                          eventHost.profilePic
                                        ) : (
                                          <Skeleton />
                                        )
                                      }
                                      className="single_event_main_bottom_left_details_hostImg"
                                    />
                                  </div>
                                </div>
                                <div className="single_event_main_bottom_left_details_eventHost_wrapper">
                                  <div className="single_event_main_bottom_left_details_eventHost_icon_wrapper">
                                    <MdPerson size={30} color={"#a6cfff"} />
                                  </div>
                                  <div className="single_event_main_bottom_left_details_eventHost_info_wrapper">
                                    <span>
                                      Event by{" "}
                                      <a
                                        href={`/profile/${
                                          eventHost ? (
                                            eventHost.userName
                                          ) : (
                                            <skeleton />
                                          )
                                        }`}
                                        className="single_event_main_bottom_left_details_eventHost_info_link"
                                      >
                                        {eventHost ? (
                                          eventHost.fullName
                                        ) : (
                                          <Skeleton />
                                        )}
                                      </a>
                                    </span>
                                  </div>
                                </div>
                                <div className="single_event_main_bottom_left_details_eventLocationLink_wrapper">
                                  <div className="single_event_main_bottom_left_details_eventLocationLink_icon_wrapper">
                                    <MdLocationOn size={30} color={"#a6cfff"} />
                                  </div>
                                  <div className="single_event_main_bottom_left_details_eventLocationLink_info_wrapper">
                                    <span>
                                      {eventInfo ? (
                                        eventInfo.eventLocation
                                      ) : (
                                        <Skeleton />
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="single_event_main_bottom_left_details_eventType_wrapper">
                                  <div className="single_event_main_bottom_left_details_eventType_icon_wrapper">
                                    {eventTypeIcon}
                                  </div>
                                  <div className="single_event_main_bottom_left_details_eventType_info_wrapper">
                                    <span>
                                      {eventInfo ? (
                                        eventInfo.visibility
                                      ) : (
                                        <Skeleton />
                                      )}{" "}
                                      • {eventTypeText}
                                    </span>
                                  </div>
                                </div>
                                <div className="single_event_main_bottom_left_details_eventDetails_wrapper">
                                  <div className="single_event_main_bottom_left_details_eventDetails_icon_wrapper">
                                    <BiDetail size={30} color={"#a6cfff"} />
                                  </div>

                                  {eventInfo.details ? (
                                    <div className="single_event_main_bottom_left_details_eventDetails_info_wrapper">
                                      <span>
                                        {eventInfo ? (
                                          eventInfo.details
                                        ) : (
                                          <Skeleton />
                                        )}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="single_event_main_bottom_left_details_noEventDetails_info_wrapper">
                                      <span>No event description yet</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="single_event_main_bottom_left_createPost_wrapper">
                              <div className="single_event_main_bottom_left_createPost_container">
                                <div className="single_event_main_bottom_left_createPost_img_wrapper">
                                  <img
                                    src={
                                      userData ? (
                                        userData.profilePic
                                      ) : (
                                        <Skeleton />
                                      )
                                    }
                                    className="single_event_main_bottom_left_createPost_img"
                                  />
                                </div>
                                <div className="single_event_main_bottom_left_createPost_btn_wrapper">
                                  <button className="single_event_main_bottom_left_createPost_btn">
                                    Add a Post
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="single_event_main_bottom_left_recentActivity_wrapper">
                              <span>RECENT ACTIVITY</span>
                            </div>
                            <div className="single_event_main_bottom_left_post_wrapper">
                              <div className="single_event_main_bottom_left_post_container">
                                <div className="single_event_main_bottom_left_post_item">
                                  <div className="single_event_main_bottom_left_post_item_header_wrapper">
                                    <div className="single_event_main_bottom_left_post_item_header">
                                      <div className="single_event_main_bottom_left_post_item_header_img_wrapper">
                                        <img
                                          src={
                                            eventHost ? (
                                              eventHost.profilePic
                                            ) : (
                                              <Skeleton />
                                            )
                                          }
                                          className="single_event_main_bottom_left_post_item_header_img"
                                          alt="event_post_img"
                                        />
                                      </div>
                                      <div className="single_event_main_bottom_left_post_item_header_info_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_header_info_name_wrapper">
                                          <a
                                            href={`/profile/${
                                              eventHost ? (
                                                eventHost.userName
                                              ) : (
                                                <Skeleton />
                                              )
                                            }`}
                                          >
                                            {" "}
                                            {eventHost ? (
                                              eventHost.fullName
                                            ) : (
                                              <Skeleton />
                                            )}
                                          </a>{" "}
                                          <h6>
                                            created a {eventCreationText} event.
                                          </h6>
                                        </div>
                                        <div className="single_event_main_bottom_left_post_item_header_dateLocation_wrapper">
                                          <div className="single_event_main_bottom_left_post_item_header_dateLocation">
                                            {eventInfo ? (
                                              eventInfo.createdAt
                                            ) : (
                                              <Skeleton />
                                            )}
                                          </div>
                                          <div className="single_event_main_bottom_left_post_item_header_dateLocation_icon_wrapper">
                                            &nbsp;• {eventTypePostIcon}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="single_event_main_bottom_left_post_item_header_btn_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_header_btn_container">
                                          <FaEllipsisH
                                            size={20}
                                            className="single_event_main_bottom_left_post_item_header_btn"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="single_event_main_bottom_left_post_item_content_wrapper">
                                    {eventBanner ? (
                                      <div className="single_event_main_bottom_left_post_item_Bcontent_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_Bcontent_container">
                                          <div className="single_event_main_bottom_left_post_item_Bcontent">
                                            <div className="single_event_main_bottom_left_post_item_Bcontent_banner_wrapper">
                                              <div className="single_event_main_bottom_left_post_item_Bcontent_banner_container">
                                                <img
                                                  src={
                                                    eventInfo ? (
                                                      eventInfo.bannerImage
                                                    ) : (
                                                      <Skeleton />
                                                    )
                                                  }
                                                  alt="event_banner"
                                                  className="single_event_main_bottom_left_post_item_Bcontent_banner"
                                                />
                                              </div>
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_Bcontent_eventInfo_wrapper">
                                              <div className="single_event_main_bottom_left_post_item_Bcontent_eventInfo_container">
                                                <div className="single_event_main_bottom_left_post_item_Bcontent_eventDateTime">
                                                  {StartDate.original} AT{" "}
                                                  {eventInfo ? (
                                                    eventInfo.eventStartTime
                                                  ) : (
                                                    <Skeleton />
                                                  )}
                                                </div>
                                                <div className="single_event_main_bottom_left_post_item_Bcontent_eventName">
                                                  {eventInfo ? (
                                                    eventInfo.eventName
                                                  ) : (
                                                    <Skeleton />
                                                  )}
                                                </div>
                                                <div className="single_event_main_bottom_left_post_item_Bcontent_eventLocation">
                                                  {eventInfo ? (
                                                    eventInfo.eventLocation
                                                  ) : (
                                                    <Skeleton />
                                                  )}
                                                </div>
                                                <div className="single_event_main_bottom_left_post_item_Bcontent_eventMetrics">
                                                  {eventGoing} Going{" "}
                                                  {eventInterested
                                                    ? `• ${eventInterested} Interested `
                                                    : ""}
                                                  &nbsp;
                                                  {eventCantGo
                                                    ? `• ${eventCantGo} Can't Go`
                                                    : ""}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="single_event_main_bottom_left_post_item_Ncontent_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_Ncontent_container">
                                          <div className="single_event_main_bottom_left_post_item_Ncontent">
                                            <div className="single_event_main_bottom_left_post_item_Ncontent_eventDateTime">
                                              {StartDate.original} AT{" "}
                                              {eventInfo ? (
                                                eventInfo.eventStartTime
                                              ) : (
                                                <Skeleton />
                                              )}
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_Ncontent_eventName">
                                              {eventInfo ? (
                                                eventInfo.eventName
                                              ) : (
                                                <Skeleton />
                                              )}
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_Ncontent_eventLocation">
                                              {eventInfo ? (
                                                eventInfo.eventLocation
                                              ) : (
                                                <Skeleton />
                                              )}
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_Ncontent_eventMetrics">
                                              {eventGoing} Going{" "}
                                              {eventInterested
                                                ? `• ${eventInterested} Interested `
                                                : ""}
                                              &nbsp;
                                              {eventCantGo
                                                ? `• ${eventCantGo} Can't Go`
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="single_event_main_bottom_left_post_item_footer_wrapper">
                                    <div className="single_event_main_bottom_left_post_item_footer_container">
                                      <div className="single_event_main_bottom_left_post_item_metrics_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_metrics_container">
                                          <div className="single_event_main_bottom_left_post_item_metrics_item">
                                            <div className="single_event_main_bottom_left_post_item_metrics_like">
                                              {likePending ? (
                                                <ClipLoader size={10} />
                                              ) : (
                                                likes
                                              )}{" "}
                                              Likes
                                            </div>
                                          </div>
                                          <div className="single_event_main_bottom_left_post_item_metrics_item">
                                            <div className="single_event_main_bottom_left_post_item_metrics_comment">
                                              {eventInfo ? (
                                                eventInfo.comments
                                              ) : (
                                                <Skeleton />
                                              )}{" "}
                                              Comments
                                            </div>
                                          </div>
                                          <div className="single_event_main_bottom_left_post_item_metrics_item">
                                            <div className="single_event_main_bottom_left_post_item_metrics_share">
                                              {eventInfo ? (
                                                eventInfo.shares
                                              ) : (
                                                <Skeleton />
                                              )}{" "}
                                              shares
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="single_event_main_bottom_left_post_item_btns_wrapper">
                                        <div className="single_event_main_bottom_left_post_item_btn_container">
                                          <div
                                            onClick={likeUnlikeAction}
                                            className={`single_event_main_bottom_left_post_item_btn_like_item ${
                                              liked && "like-active"
                                            }`}
                                          >
                                            <div className="single_event_main_bottom_left_post_item_btn_item_icon">
                                              {likePending ? (
                                                <ClipLoader
                                                  size={20}
                                                  color={"#036"}
                                                />
                                              ) : (
                                                <FaRegHeart size={20} />
                                              )}
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_btn_item_name">
                                              {liked ? "Liked" : "like"}
                                            </div>
                                          </div>
                                          <div className="single_event_main_bottom_left_post_item_btn_item">
                                            <div className="single_event_main_bottom_left_post_item_btn_item_icon">
                                              <FaRegCommentDots size={20} />
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_btn_item_name">
                                              Comment
                                            </div>
                                          </div>
                                          <div className="single_event_main_bottom_left_post_item_btn_item">
                                            <div className="single_event_main_bottom_left_post_item_btn_item_icon">
                                              <CiShare2 size={20} />
                                            </div>
                                            <div className="single_event_main_bottom_left_post_item_btn_item_name">
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
                          <div className="single_event_main_bottom_right_wrapper">
                            Right
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
      ) : (
        <div style={{ width: "100vw", height: "100vh" }}>
          <Skeleton />
        </div>
      )}
    </>
  );
}

export default SingleEvent;
