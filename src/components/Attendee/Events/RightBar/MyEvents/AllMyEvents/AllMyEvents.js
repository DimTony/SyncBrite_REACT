import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { Card } from "react-bootstrap";
import axios from "axios";
import "../../../Events.css";
import "./AllMyEvents.css";
import AttendeeNavbar from "../../../../Navbar/AttendeeNavbar";
import Leftbar from "../../../LeftBar/Leftbar";
import { maxHeight } from "@mui/system";

function AllMyEvents() {
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
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      const syncToken = cookies.SyncBriteToken;
      const url = window.location.href;
      const userNameMatch = url.match(/\/attendee\/([^/]+)\/events/);

      if (syncToken && userNameMatch) {
        try {
          const username = userNameMatch[1];

          const response = await axios.get(
            "https://syncbrite.onrender.comapi/events",
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (
            response.status === 200 &&
            response.data.user.userName === username
          ) {
            setUserData(response.data.user);
            setEvents(response.data.events);
          } else {
            generateError(
              "Failed to verify the cookie.\n REDIRECTING TO LOGIN..."
            );
            setCookie("SyncBriteToken", "none", { path: "/" });
            removeCookie("SyncBriteToken");
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
        if (!syncToken) {
          generateError("Server Error.\nREDIRECTING TO LOGIN...");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }

        if (!userNameMatch) {
          generateError("Server Error.\nREDIRECTING TO EVENTS PAGE...");
          setTimeout(() => {
            navigate("/attendee/events");
          }, 3000);
        }
      }
    };

    checkCookieAndFetchData();
  }, [navigate]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents =
    events && events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    return (
      <ul className="pagination">
        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }).map(
          (_, index) => (
            <li
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </li>
          )
        )}
      </ul>
    );
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
              <div className="all_my_events_wrapper">
                <div className="righter_events_contents_discover_container">
                  <div className="all_my_events_container">
                    {currentEvents &&
                      currentEvents.map((event, index) => (
                        <span
                          key={index}
                          className="righter_events_contents_item_container size_all_my_events_container"
                          style={{
                            background: "#fff",
                            maxHeight: "348px",
                            maxWidth: "485px",
                            minHeight: "348px",
                            minWidth: "485px",
                            margin: "0 1rem 1rem 0",
                          }}
                        >
                          <Card className="righter_events_contents_item">
                            <a href={`/attendee/events/${event._id}`}>
                              {event.bannerImage !==
                              "https://placehold.co/640x374" ? (
                                <div className="all_my_events_set_image_wrapper">
                                  <div className="all_my_events_set_image_container">
                                    <Card.Img
                                      variant="top"
                                      src={event.bannerImage}
                                      className="all_my_events_set_image"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="all_my_events_no_set_image_wrapper">
                                  <div className="all_my_events_no_set_image_container">
                                    <div className="single_event_main_top_date_item">
                                      <div className="single_event_main_top_date_month">
                                        <h2>month</h2>
                                      </div>
                                      <div className="single_event_main_top_date_day">
                                        <h2>day</h2>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <Card.Body className="righter_events_contents_item_body">
                                <Card.Title
                                  className="righter_events_contents_item_body_title"
                                  style={{ fontSize: "18px" }}
                                >
                                  {event.eventStartDate} AT{" "}
                                  {event.eventStartTime}
                                </Card.Title>
                                <Card.Text className="righter_events_contents_item_body_info">
                                  <span
                                    className="righter_events_contents_item_body_info_name"
                                    style={{ fontSize: "20px" }}
                                  >
                                    {event.eventName}
                                  </span>
                                  <span className="righter_events_contents_item_body_info_location">
                                    {event.eventLocation}{" "}
                                  </span>
                                  <span className="righter_events_contents_item_body_info_attendance">
                                    {event.going} Going • {event.interested}{" "}
                                    Interested • {event.cantGo} Can't Go
                                  </span>
                                </Card.Text>
                              </Card.Body>
                            </a>
                          </Card>
                        </span>
                      ))}
                  </div>
                </div>
                {events && renderPageNumbers()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100vw", height: "1oovh" }}>
          <Skeleton />
        </div>
      )}
    </>
  );
}

export default AllMyEvents;
