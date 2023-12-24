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
import "../Events.css";
import MyEvents from "../RightBar/MyEvents/MyEvents";
import TopEvents from "../RightBar/TopEvents/TopEvents";
import FriendEvents from "../RightBar/FriendEvents/FriendEvents";
import FollowingEvents from "../RightBar/FollowingEvents/FollowingEvents";
import GroupEvents from "../RightBar/GroupEvents/GroupEvents";

function Rightbar({ userData, setUserData }) {
  const [cookies] = useCookies([]);
  const [topEvents, setTopEvents] = useState(true);
  const [topEventsItem, setTopEventsItem] = useState(true);
  const [friendEvents, setFriendEvents] = useState(false);
  const [followingEvents, setFollowingEvents] = useState(false);
  const [groupEvents, setGroupEvents] = useState(false);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchTopEventsData = async () => {
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        try {
          const response = await axios.get(
            "https://syncbrite-server.onrender.com/api/events/top",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            setUserData(response.data.user);
            setTopEventsItem(response.data.events);
          } else {
            generateError(
              "Failed to verify the user.\n REDIRECTING TO LOGIN..."
            );
            console.error("Failed to verify the cookie");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          generateError(error, "REDIRECTING TO LOGIN...");
          console.error("Error fetching user data:", error);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } else {
        generateError("Server Error.\nREDIRECTING TO LOGIN...");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };

    fetchTopEventsData();
  }, [navigate]);

  const toggleTopEvents = () => {
    setTopEvents(true);
    setFriendEvents(false);
    setFollowingEvents(false);
    setGroupEvents(false);
  };

  const toggleFriendEvents = () => {
    setTopEvents(false);
    setFriendEvents(true);
    setFollowingEvents(false);
    setGroupEvents(false);
  };

  const toggleFollowingEvents = () => {
    setTopEvents(false);
    setFriendEvents(false);
    setFollowingEvents(true);
    setGroupEvents(false);
  };

  const toggleGroupEvents = () => {
    setTopEvents(false);
    setFriendEvents(false);
    setFollowingEvents(false);
    setGroupEvents(true);
  };

  const buttonRefs = [useRef(), useRef(), useRef(), useRef()];

  const buttonPaths = ["/attendee/events", "/friends", "/following", "/groups"];
  const buttonNames = ["top", "friends", "following", "groups"];
  const buttonClicks = [
    toggleTopEvents,
    toggleFriendEvents,
    toggleFollowingEvents,
    toggleGroupEvents,
  ];

  const buttonStyles = (index) => {
    return {
      backgroundColor:
        (index === 0 && topEvents) ||
        (index === 1 && friendEvents) ||
        (index === 2 && followingEvents) ||
        (index === 3 && groupEvents)
          ? "#ededff"
          : "",
      border:
        (index === 0 && topEvents) ||
        (index === 1 && friendEvents) ||
        (index === 2 && followingEvents) ||
        (index === 3 && groupEvents)
          ? "1px solid #003366"
          : "",
      color:
        (index === 0 && topEvents) ||
        (index === 1 && friendEvents) ||
        (index === 2 && followingEvents) ||
        (index === 3 && groupEvents)
          ? "#003366"
          : "",
    };
  };

  return (
    <>
      <div className="righter_events_wrapper">
        <MyEvents />

        <div className="righter_events_container">
          <div className="righter_events_title">
            <div className="righter_events_title_text">
              <h2>Discover Events</h2>
            </div>
          </div>
          <div className="righter_events_filter_btns">
            <div className="righter_events_filter_location_btn_container">
              <button className="righter_events_filter_location_btn">
                <MdLocationOn fontSize={25} /> My Location{" "}
                <PiCaretDownBold
                  strokeWidth={35}
                  style={{ marginLeft: "0.5rem" }}
                />
              </button>
            </div>
            <div className="righter_events_filter_date_btn_container">
              <button className="righter_events_filter_date_btn">
                <MdCalendarMonth
                  fontSize={25}
                  style={{ marginRight: "0.5rem" }}
                />
                Any Date{" "}
                <PiCaretDownBold
                  strokeWidth={35}
                  style={{ marginLeft: "0.5rem" }}
                />
              </button>
            </div>
            <div className="righter_events_filter_type_btn">
              {buttonRefs.map((buttonRef, index) => (
                <button
                  key={index}
                  ref={buttonRef}
                  data-path={buttonPaths[index]}
                  onClick={buttonClicks[index]}
                  className="righter_events_filter_discover_btn"
                  style={buttonStyles(index)}
                >
                  {buttonNames[index].charAt(0).toUpperCase() +
                    buttonNames[index].slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="righter_events_contents_wrapper">
            <div className="righter_events_contents_discover_container">
              <TopEvents events={topEvents} eventItems={topEventsItem} />

              <FriendEvents events={friendEvents} />

              <FollowingEvents events={followingEvents} />

              <GroupEvents events={groupEvents} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rightbar;
