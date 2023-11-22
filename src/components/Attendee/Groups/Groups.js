import React, { useState, useEffect } from "react";
import "./Groups.css";
import verifyUser from "../../../helpers/VerifyUser";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";
import { useNavigate } from "react-router-dom";

function Groups() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUserStatus = async () => {
      const { user, isLoggedIn, error } = await verifyUser(navigate);

      if (isLoggedIn) {
        // User is authenticated
        setIsLoggedIn(true);
        setUserData(user);
      } else {
        // User is not authenticated
        setIsLoggedIn(false);
        setError("User Unauthorized");
      }
    };

    checkUserStatus();
  }, []);
  return (
    <>
      <div className="main_container">
        <AttendeeNavbar
          isLoggedIn={isLoggedIn}
          userData={userData}
          error={error}
          setUserData={setUserData}
        />

        <div className="hero_container">Groups</div>
      </div>
    </>
  );
}

export default Groups;
