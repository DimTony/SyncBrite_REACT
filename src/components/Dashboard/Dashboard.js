import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";
import DashboardNavbar from "./Navbar/DashboardNavbar";

function Dashboard() {
  const [error, setError] = useState(null);
  const { authUser, setAuthUser, isLoggedin, setIsLoggedIn } = useAuth();

  return (
    <>
      <div>
        <DashboardNavbar />
      </div>

      {error && (
        <div>
          {/* Render your error page content here */}
          <h1 className="error_msg">Error: Invalid Token: {error}</h1>
        </div>
      )}
    </>
  );
}

export default Dashboard;
