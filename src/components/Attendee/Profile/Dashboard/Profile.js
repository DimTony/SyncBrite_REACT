import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Profile.css";
import profilePicPlaceholder from "../../../../images/placeholder.png";
import AttendeeNavbar from "../../Navbar/AttendeeNavbar";
import LoggedInLeftbar from "../LeftBar/LoggedInLeftBar/LoggedInLeftbar";
import LoggedInRightbar from "../Rightbar/LoggedInRightBar/LoggedInRightbar";
import UserRightbar from "../Rightbar/UserRightBar/UserRightbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [myProfile, setMyProfile] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [otherUser, setOtherUser] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const userNameMatch = url.match(/\/profile\/([^/]+)/);
      const syncToken = cookies.SyncBriteToken;

      if (userNameMatch) {
        try {
          if (!syncToken) {
            navigate("/login");
          } else {
            const username = userNameMatch[1];

            const { data } = await axios.post(
              "https://syncbrite.onrender.comapi/auth/verify-cookie",
              {},
              { withCredentials: true }
            );

            if (!data.success) {
              navigate("/attendee/dashboard");
            } else if (data.success && data.user.userName !== username) {
              const usernameData = await axios.get(
                `https://syncbrite.onrender.comapi/users/profile/${username}`,
                {
                  withCredentials: true,
                  headers: { Authorization: `Bearer ${syncToken}` },
                }
              );
              if (usernameData.status === 200) {
                setUser(data.user);
                setMyProfile(false);
                setOtherUser(usernameData.data.user);
              }
            } else if (data.success && data.user.userName === username) {
              console.log("denedd", data.user);

              setUser(data.user);
              setMyProfile(true);
            } else {
              removeCookie("SyncBriteToken");
              navigate("/login");
            }
          }
        } catch (error) {
          setUser(null);
          removeCookie("SyncBriteToken");
          navigate("/login");
          generateError(error);
        }
      } else {
        setUser(null);
        removeCookie("SyncBriteToken");
        navigate("/login");
        generateError("Something went wrong!!!");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      {user && (
        <div className="main_container">
          <AttendeeNavbar
            userData={user}
            cookies={cookies}
            removeCookie={removeCookie}
            formUpdated={formUpdated}
            setUser={setUser}
          />
          <div className="wrapper">
            <LoggedInLeftbar user={user} />
            {myProfile ? (
              <LoggedInRightbar user={user} />
            ) : (
              <UserRightbar user={user} friend={otherUser} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
