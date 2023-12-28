import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const MyEvents = () => {
  const [cookies] = useCookies(["SyncBriteToken"]);
  const [absoluteLink, setAbsoluteLink] = useState();
  const [myEvents, setMyEvents] = useState([]);
  const [user, setUser] = useState([]);
  const [recentEvent, setRecentEvent] = useState([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const syncToken = cookies.SyncBriteToken;
        const response = await axios.get(
          "https://syncbrite.onrender.comapi/events",
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${syncToken}` },
          }
        );
        const data = response.data;

        if (data.success) {
          setUser(data.user);
          setMyEvents(data.events);
          const recentEvent =
            data.events.length > 0 ? data.events[data.events.length - 1] : null;
          setRecentEvent(recentEvent);
        } else {
          generateError(data.error);
          console.error("Failed to fetch events:", data.error);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (myEvents && myEvents.length > 0) {
      const eventLink = recentEvent.link;

      // Check if it's a valid URL
      try {
        new URL(eventLink);
        setAbsoluteLink(eventLink);
      } catch (error) {
        // If not a valid URL, treat it as a relative URL and resolve it
        setAbsoluteLink(new URL(eventLink, window.location.href).toString());
      }
    } else {
      // Handle the case when myEvents is empty or undefined
      setAbsoluteLink(null);
    }
  }, [myEvents]);
  return (
    <>
      <ToastContainer />
      {myEvents.length > 0 && (
        <div className="righter_events_contents_own_events_wrapper">
          <div className="righter_events_contents_own_events_container">
            <div className="righter_events_contents_own_events_header_container">
              <div className="righter_events_contents_own_events_header_title">
                <h2>Your Events</h2>
              </div>
              {myEvents.length > 1 && (
                <div className="righter_events_contents_own_events_header_btn_container">
                  <a
                    href={`/attendee/${
                      user ? user.userName : <Skeleton />
                    }/events`}
                  >
                    <button className="righter_events_contents_own_events_header_btn">
                      See All
                    </button>
                  </a>
                </div>
              )}
            </div>

            {myEvents.length > 0 && (
              <span className="righter_events_contents_own_events_card_container">
                <Card className="righter_events_contents_own_events_card">
                  <a
                    href={`/attendee/events/${recentEvent._id}`}
                    className="righter_events_contents_own_events_card_link"
                  >
                    <Card.Img
                      variant="top"
                      src="https://placehold.co/400x200"
                    />
                    <Card.Body className="righter_events_contents_own_events_card_body">
                      <Card.Text className="righter_events_contents_own_events_card_body_info">
                        <span className="actual-price">
                          {recentEvent.eventStartDate} AT{" "}
                          {recentEvent.eventStartTime}
                        </span>
                      </Card.Text>
                      <Card.Title>
                        <h1 className="righter_events_contents_own_events_card_body_title">
                          {recentEvent.eventName}
                        </h1>
                      </Card.Title>
                      <Card.Text className="righter_events_contents_own_events_card_body_info">
                        <span className="mrp-price">
                          {recentEvent.eventLocation ? (
                            recentEvent.eventLocation
                          ) : (
                            <a
                              className="righter_events_contents_own_events_card_body_info_link"
                              href={absoluteLink}
                            >
                              Event Link
                            </a>
                          )}
                        </span>
                      </Card.Text>
                      <Card.Text className="righter_events_contents_own_events_card_body_info">
                        <span className="save-price">
                          {recentEvent.going} Going • {recentEvent.interested}{" "}
                          Maybe • {recentEvent.cantGo} Can't Go
                        </span>
                      </Card.Text>
                    </Card.Body>
                  </a>
                </Card>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyEvents;
