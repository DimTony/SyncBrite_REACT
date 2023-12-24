import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./Groups.css";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";
import Leftbar from "./LeftBar/Leftbar";

function Groups() {
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
  const [cookies] = useCookies([]);
  const [userData, setUserData] = useState(null);
  const [currentRight, setCurrentRight] = useState(1);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/verify-auth",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${syncToken}`,
              },
            }
          );

          if (response.status === 200) {
            setUserData(response.data.user);
          } else {
            generateError(
              "Failed to verify the cookie.\n REDIRECTING TO LOGIN..."
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

    checkCookieAndFetchData();
  }, [navigate]);

  return (
    <>
      {userData ? (
        <div className="notifications_main_container">
          <AttendeeNavbar userData={userData} />

          <div className="notifications_hero_container">
            <ToastContainer />
            <div className="left">
              <Leftbar
                data={data}
                setData={setData}
                currentRight={currentRight}
              />
            </div>
            <div className="righter">
              {currentRight === 1 && <div>Your Feed</div>}
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

export default Groups;
