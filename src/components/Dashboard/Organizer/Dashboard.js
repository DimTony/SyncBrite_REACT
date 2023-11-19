import React, { useEffect, useState } from "react";
import axios from "axios";

function OrganizerDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function verifyUser() {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8080/api/auth/verify/${token}`;
      try {
        const { data: res } = await axios.post(url);

        const userData = {
          id: res.data.user.id,
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          role: res.data.user.role,
        };

        setUserData(userData);
      } catch (error) {
        // Handle errors
        console.error("Error verifying user:", error);
      }
    }

    verifyUser();
  }, []);

  return (
    <>
      <div>
        {userData ? <h1>Welcome, {userData.firstName}!</h1> : <p>Loading...</p>}
      </div>
    </>
  );
}

export default OrganizerDashboard;
