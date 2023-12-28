import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./MainTopEvents.css";

const MainTopEvents = () => {
  const [cookies] = useCookies([]);
  const [topEventsItem, setTopEventsItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const extractMonthAndDay = (dateString) => {
    try {
      const date = new Date(dateString);
      return {
        monthShort: new Intl.DateTimeFormat("en-US", { month: "short" })
          .format(date)
          .toUpperCase(),
        day: date.getDate(),
        cap: dateString.toUpperCase(),
      };
    } catch (error) {
      console.error("Error parsing date:", error);
      return {
        monthShort: "Invalid",
        day: "Invalid",
      };
    }
  };

  useEffect(() => {
    const fetchTopEventsData = async () => {
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        try {
          const response = await axios.get(
            "https://syncbrite.onrender.comapi/events/main",
            {
              headers: {
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            const eventInfo = response.data.sortedEvents.map((event) => {
              const startDateInfo = extractMonthAndDay(event.eventStartDate);
              const endDateInfo = extractMonthAndDay(event.eventEndDate);
              const repeatDateInfo = extractMonthAndDay(event.repeatDate);

              // If there are multiple custom dates, map over them and extract the info
              const customDatesInfo = event.customDates.map((customDate) =>
                extractMonthAndDay(customDate)
              );

              return {
                ...event,
                startDateInfo,
                endDateInfo,
                repeatDateInfo,
                customDatesInfo,
              };
            });

            setTopEventsItem(eventInfo);
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

  return (
    <>
      <div className="main_top_events_wrapper">
        {topEventsItem &&
          topEventsItem.map((event, index) => (
            <span
              key={index}
              className="main_top_events_contents_item_container"
            >
              <Card className="main_top_events_contents_item">
                <a
                  href={`/attendee/events/${event._id}`}
                  className="main_top_events_contents_item_link"
                >
                  {event.bannerImage !== "https://placehold.co/640x374" ? (
                    <div className="main_top_events_set_image_wrapper">
                      <div className="main_top_events_set_image_container">
                        <Card.Img
                          variant="top"
                          src={event.bannerImage}
                          className="main_top_events_set_image"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="main_top_events_no_set_image_wrapper">
                      <div className="main_top_events_no_set_image_container">
                        <div className="single_event_main_top_date_item">
                          <div className="single_event_main_top_date_month">
                            <h2>{event.startDateInfo.monthShort}</h2>
                          </div>
                          <div className="single_event_main_top_date_day">
                            <h2>{event.startDateInfo.day}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <Card.Body className="main_top_events_contents_item_body">
                    <Card.Title
                      className="main_top_events_contents_item_body_title"
                      style={{ fontSize: "18px" }}
                    >
                      {event.startDateInfo.cap} AT {event.eventStartTime}
                    </Card.Title>
                    <Card.Text className="main_top_events_contents_item_body_info">
                      <span className="main_top_events_contents_item_body_info_name">
                        {event.eventName}
                      </span>
                      <span className="main_top_events_contents_item_body_info_location">
                        {event.eventLocation}{" "}
                      </span>
                      <span className="main_top_events_contents_item_body_info_attendance">
                        {event.going} Going • {event.interested} Interested •{" "}
                        {event.cantGo} Can't Go
                      </span>
                    </Card.Text>
                  </Card.Body>
                </a>
              </Card>
            </span>
          ))}
      </div>
    </>
  );
};

export default MainTopEvents;
