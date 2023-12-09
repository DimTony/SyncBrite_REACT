import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";
import "../Dashboard/Profile.css";
import profilePicPlaceholder from "../../../../images/placeholder.png";
import AttendeeNavbar from "../../Navbar/AttendeeNavbar";
import Leftbar from "../LeftBar/Leftbar";

function Videos() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [picChanged, setPicChanged] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePicPlaceholder);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const userNameMatch = url.match(/\/profile\/([^/]+)\/videos/);

      if (userNameMatch) {
        try {
          if (!cookies.SyncBriteToken) {
            navigate("/login");
          } else {
            const username = userNameMatch[1];

            const { data } = await axios.post(
              "http://localhost:8080/api/auth/verify-cookie",
              {},
              { withCredentials: true }
            );

            if (!data.success) {
              setIsLoggedIn(false);
              setCookie("SyncBriteToken", "none", { path: "/" });
              removeCookie("SyncBriteToken");
              navigate("/login");
            } else if (data.user.userName !== username) {
              setIsLoggedIn(false);
              setCookie("SyncBriteToken", "none", { path: "/" });
              removeCookie("SyncBriteToken");
              navigate("/login");
            } else {
              setUser(data.user);
              setProfilePicture(data.user.profilePic);
              setIsLoggedIn(true);
            }
          }
        } catch (error) {
          setIsLoggedIn(false);
          removeCookie("SyncBriteToken");
          navigate("/login");
          generateError(error);
        }
      } else {
        setIsLoggedIn(false);
        removeCookie("SyncBriteToken");
        navigate("/login");
        generateError("Something went wrong!!!");
      }
    };

    fetchData();
  }, [navigate, removeCookie, setIsLoggedIn, picChanged]);

  return (
    <>
      <div>
        <ToastContainer />
        {isLoggedIn && (
          <div className="main_container">
            <AttendeeNavbar
              userData={user}
              cookies={cookies}
              removeCookie={removeCookie}
              formUpdated={formUpdated}
              setUser={setUser}
            />
            <div className="wrapper">
              <Leftbar user={user} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Videos;
