import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "./SuperAdmin.css";
import AttendeeNavbar from "../../../Navbar/AttendeeNavbar";
import Leftbar from "./Leftbar/Leftbar";
import Home from "./Home/Home";

function SuperAdmin({ user, groupData }) {
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
  const [currentRight, setCurrentRight] = useState(1);
  const navigate = useNavigate();

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  return (
    <>
      {user ? (
        <div className="superAdmin_groups_main_container">
          <AttendeeNavbar userData={user} />

          <div className="superAdmin_groups_hero_container">
            <ToastContainer />
            <div className="superAdmin_groups_left">
              <Leftbar
                userData={user}
                groupData={groupData}
                data={data}
                setData={setData}
                currentRight={currentRight}
                setCurrentRight={setCurrentRight}
              />
            </div>
            <div className="superAdmin_groups_right">
              {currentRight === 1 && (
                <div className="superAdmin_groups_right_home">
                  <Home user={user} group={groupData} />
                </div>
              )}
              {currentRight === 2 && <div>Overview</div>}
              {currentRight === 3 && <div>THree</div>}
              {currentRight === 4 && <div>Four</div>}
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

export default SuperAdmin;
