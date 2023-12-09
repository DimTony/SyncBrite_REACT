import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Groups.css";
import authUser from "../../../helpers/authUser";
import AttendeeNavbar from "../Navbar/AttendeeNavbar";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdArrowBack } from "react-icons/md";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

function Groups() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [holidays, setHolidays] = useState(null);
  const [createEventModal, setCreateEventModal] = useState(false);
  const [eventType, setEventType] = useState("");
  const [coHost, setCoHost] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [visibility, setVisibility] = useState("");
  const [data, setData] = useState({
    eventName: "",
    eventStartDate: "",
    eventStartTime: "",
    details: "",
    eventLocation: "",
    link: "",
    visibility: "",
    visibilityGroup: "",
    eventType: "",
    selectedGroups: "",
    coHostEmail: "",
    repeatType: "",
    RepeatEndDate: "",
    RepeatEndTime: "",
  });

  useEffect(() => {
    const checkCookieAndFetchData = async () => {
      // Check if the cookie exists in the browser
      const syncToken = cookies.SyncBriteToken;

      if (syncToken) {
        // If the cookie exists, send an API call to the backend using Axios
        try {
          const response = await axios.post(
            "http://localhost:8080/api/auth/verify-auth",
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

  const toggleEventCreator = () => {
    setCreateEventModal(!createEventModal);
  };

  if (createEventModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const showNextSlide = (e) => {
    e.preventDefault();
    setShowFirstModal(false);
  };

  const showFirstSlide = (e) => {
    e.preventDefault();
    setShowFirstModal(true);
  };

  const handleDates = (date) => {
    console.log(date);
    setHolidays(date);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const groupOptions = [
    { value: "group1", label: "Group 1" },
    {
      value: "group2",
      label:
        "Group 2ekenkeneknekenkeeknekenkkenekeknnknkdkddkdkndkdnkdiidjidjdjdjdjdljdlddnkdndknddnjddhddkdkndkddhijojdldkdkdnkdddidk",
    },
    // Add more group options as needed
  ];

  const handleGroupChange = (e) => {
    const groupName = e.target.value;

    // Check if the group is already selected
    if (selectedGroups.includes(groupName)) {
      // Remove the group if already selected
      setSelectedGroups((prevGroups) =>
        prevGroups.filter((group) => group !== groupName)
      );
    } else {
      // Add the group if not already selected
      setSelectedGroups((prevGroups) => [...prevGroups, groupName]);
    }
  };

  const handleCoHostChange = (e) => {
    setCoHost(e.target.value);
  };

  const handleRepeatTypeChange = (e) => {
    setRepeatType(e.target.value);
  };

  return (
    <>
      {userData ? (
        <div className="main_container">
          <ToastContainer />
          <AttendeeNavbar userData={userData} />

          <div className="hero_container">Groups</div>
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
