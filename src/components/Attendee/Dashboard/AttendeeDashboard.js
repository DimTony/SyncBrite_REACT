import React, { useState, useEffect } from "react";
import axios from "axios";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";

function AttendeeDashboard() {
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
      <div>
        <AttendeeNavbar
          error={error}
          isLoggedIn={isLoggedIn}
          userData={userData}
          setUserData={setUserData}
        />
      </div>
    </>
  );
}

export default AttendeeDashboard;
