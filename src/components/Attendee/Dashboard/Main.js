import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
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
import CenterTop from "./CenterSection/CenterTop/CenterTop";
import CenterBottom from "./CenterSection/CenterBottom/CenterBottom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);

  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      // Check if the cookie exists in the browser
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        // If the cookie exists, send an API call to the backend using Axios
        try {
          const response = await axios.post(
            "https://syncbrite-server.onrender.com/api/auth/verify-auth",
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
  }, [navigate]);

  return (
    <div>
      {userData ? (
        <div className="main_container">
          <div className="main_wrapper">
            <AttendeeNavbar userData={userData} />
            <ToastContainer />
            <div className="dashboard_hero_container">
              <LeftSection userData={userData} />
              <div className="center_section">
                <div className="center_section_container">
                  <CenterTop userData={userData} />
                  <CenterBottom />
                </div>
              </div>
              <RightSection />
            </div>
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
