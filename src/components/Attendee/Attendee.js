import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import AttendeeNavbar from "./Navbar/AttendeeNavbar";
import Main from "./Dashboard/Main";
import Event from "./Events/Events";
import Groups from "./Groups/Groups";
import Notifications from "./Notifications/Notifications";

function Attendee({ activeRoute }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/api/auth/verify/${token}`;
      try {
        const { data: res } = await axios.post(url);

        const user = {
          id: res.data.user.id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          role: res.data.user.role,
        };

        setUserData(user);
        setIsLoggedIn(true);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setIsLoggedIn(false);
          setError(error.response.data.message);
        }
      }
    }

    verifyUser();
  }, []);

  return (
    <>
      <AttendeeNavbar
        isLoggedIn={isLoggedIn}
        userData={userData}
        error={error}
        setUserData={setUserData}
      />
      <Routes>
        {activeRoute === "dashboard" && (
          <Route
            path="/attendee/dashboard"
            element={
              <Main isLoggedIn={isLoggedIn} userData={userData} error={error} />
            }
          />
        )}
        {activeRoute === "events" && (
          <Route
            path="/attendee/events"
            element={
              <Event
                isLoggedIn={isLoggedIn}
                userData={userData}
                error={error}
              />
            }
          />
        )}
        {activeRoute === "groups" && (
          <Route
            path="/attendee/groups"
            element={
              <Groups
                isLoggedIn={isLoggedIn}
                userData={userData}
                error={error}
              />
            }
          />
        )}
        {activeRoute === "notifications" && (
          <Route
            path="/attendee/notifications"
            element={
              <Notifications
                isLoggedIn={isLoggedIn}
                userData={userData}
                error={error}
              />
            }
          />
        )}
      </Routes>
    </>
  );
}

export default Attendee;
