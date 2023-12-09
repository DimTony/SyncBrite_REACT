import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import "react-loading-skeleton/dist/skeleton.css";
import "./Main.css";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";
import { Card } from "react-bootstrap";
import { CiShare2 } from "react-icons/ci";
import {
  FaRegCalendarPlus,
  FaRegHeart,
  FaRegCommentDots,
} from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import EventSlider from "./Slider/EventSlider";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import placeholderIcon from "../../../images/placeholder.png";
import coverPicPlaceholder from "../../../images/cover-placeholder.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);

  const topDealsItems = [
    {
      title: "CHARISMATA CONFERENCE 2023!!!",
      date: "FRIDAY, DECEMBER 8, 2023 AT 4 AM UTC+01",
      location: "Hamburg",
      url: "/attendee/dashboard",
      interested: 123,
      going: 45,
    },
    {
      title: "TONGUES AND SONGS 5",
      date: "WEDNESDAY, JANUARY 17, 2024 AT 4 AM UTC+01",
      location: "Minsk, the municipality",
      url: "/attendee/dashboard",
      interested: 678,
      going: 910,
    },
    {
      title: "Rehoboth 2023",
      date: "MONDAY, FEBRUARY 26, 2024 AT 4 AM UTC+01",
      location: "Gomel Region",
      url: "/attendee/dashboard",
      interested: 1112,
      going: 13,
    },
    {
      title: "Hotel Danag",
      date: "SUNDAY, APRIL 7, 2024 AT 4 AM UTC+01",
      location: "Santiago de Cuba",
      url: "/attendee/dashboard",
      interested: 1415,
      going: 16,
    },
    {
      title: "MEET YOUR MATCH 2023(MYM)",
      date: "SATURDAY, MAY 18, 2024 AT 4 AM UTC+01",
      location: "Munich (München)",
      url: "/attendee/dashboard",
      interested: 1718,
      going: 19,
    },
    {
      title: "FEAST OF MIRACLE 2023",
      date: "FRIDAY, JUNE 28, 2024 AT 4 AM UTC+01",
      location: "Cologne (Köln)",
      interested: 2021,
      going: 22,
    },
    {
      title: "Christmas Carol Concert",
      date: "WEDNESDAY, AUGUST 7, 2024 AT 4 AM UTC+01",
      location: "North Rhine-Westphalia",
      interested: 2324,
      going: 25,
    },
    {
      title: "Tontex Garden Centre",
      date: "TUESDAY, SEPTEMBER 17, 2024 AT 4 AM UTC+01",
      location: "Bavaria",
      interested: 2627,
      going: 28,
    },
    // Add more items as needed
  ];

  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      // Check if the cookie exists in the browser
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        // If the cookie exists, send an API call to the backend using Axios
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/verify-auth",
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
  }, [navigate]); // The empty dependency array ensures that this effect runs only once on component mount

  return (
    <div>
      {userData ? (
        <div className="main_container">
          <AttendeeNavbar userData={userData} />
          <ToastContainer />
          <div className="dashboard_hero_container">
            <LeftSection userData={userData} />
            <div className="center_section">
              <div className="center_section_container">
                <div className="center_top">
                  <EventSlider>
                    <Card className="create_card">
                      <a
                        href="/events/create"
                        className="create_card_create_event"
                      >
                        <Card.Img
                          variant="top"
                          src={userData ? userData.profilePic : placeholderIcon}
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />

                        <Card.Body className="create_card_body">
                          <Card.Title className="create_card_body_title">
                            Create Event
                          </Card.Title>
                          <Card.Text>
                            <FaRegCalendarPlus size={30} />
                          </Card.Text>
                        </Card.Body>
                      </a>
                    </Card>
                    {topDealsItems.map((item, index) => (
                      <span
                        key={index}
                        style={{
                          boxShadow: "0px 0px 16px -8px rgb(0 0 0 / 68%)",
                        }}
                      >
                        <Card style={{ width: "19rem" }}>
                          <a href={item.url}>
                            <Card.Img
                              variant="top"
                              src="https://placehold.co/300x160"
                            />
                            <Card.Body>
                              <Card.Title>{item.date}</Card.Title>
                              <Card.Text>
                                <span className="actual-price">
                                  {item.title}
                                </span>
                                <span className="mrp-price">
                                  {item.location}{" "}
                                </span>
                                <span className="save-price">
                                  {item.interested} interested • {item.going}{" "}
                                  going
                                </span>
                              </Card.Text>
                            </Card.Body>
                          </a>
                        </Card>
                      </span>
                    ))}
                  </EventSlider>
                </div>
                <div className="center_bottom">
                  <div className="center_bottom_wrapper">
                    <div className="center_bottom_container">
                      <div className="center_bottom_col_main">
                        <div className="rightbar_col_main_item">
                          <div className="rightbar_col_main_item_header">
                            <div className="rightbar_col_main_item_header_img_holder">
                              <img
                                src={placeholderIcon}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <RightSection />
          </div>
        </div>
      ) : (
        <div style={{ width: "100vw", height: "1oovh" }}>
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
