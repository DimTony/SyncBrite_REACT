import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowBack } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import axios from "axios";
import "./CustomEventRepeat.css";

function CustomEventRepeat({ user, onBack, toOne, data, setData }) {
  const [selectedTimestamps, setSelectedTimestamps] = useState([]);
  const [file, setFile] = useState();
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [holidays, setHolidays] = useState(null);
  const [eventType, setEventType] = useState("");
  const [visibility, setVisibility] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [coHost, setCoHost] = useState("");
  const [customEventRepeatModal, setCustomEventRepeatModal] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const navigate = useNavigate();

  const toggleCustomEventRepeatModal = () => {
    console.log("e click");
    setCustomEventRepeatModal(!customEventRepeatModal);
  };

  if (customEventRepeatModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];

    displayFilePreview(selectedFile);

    setFile(selectedFile);
  };

  const displayFilePreview = (selectedFile) => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const filePreviewDiv = document.getElementById("filePreview");
        if (filePreviewDiv) {
          filePreviewDiv.innerHTML = `<img src="${reader.result}" alt="File Preview" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />`;
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
    setData((prevData) => ({
      ...prevData,
      eventType: e.target.value,
    }));
  };

  const handleVisibilityChange = (e) => {
    setVisibility(e.target.value);
  };

  const handleRepeatTypeChange = (e) => {
    setRepeatType(e.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("just chill...");
  };

  const handleDates = (date) => {
    console.log(date);
    setHolidays(date);
  };

  const handleChange = (array) => {
    setData((prevData) => ({
      ...prevData,
      customDates: array,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const syncToken = cookies.SyncBriteToken;
        const url = "http://localhost:8080/api/users";
        const { data } = await axios.get(url, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${syncToken}`,
          },
        });
        setUpdatedUser(data.profile);
      } catch (error) {
        console.log(error);
        toast.error("Failed to update profile");
      }
    };

    fetchData();
  }, []);

  const showNextSlide = (e) => {
    e.preventDefault();
    setShowFirstModal(false);
  };

  const showFirstSlide = (e) => {
    e.preventDefault();
    setShowFirstModal(true);
  };

  return (
    <>
      <div className="create_event_modal2_wrapper">
        <div className="custom_event_dates_header">
          <h2>Select Custom Event Dates</h2>
          <div className="custom_event_dates_header_btn_container">
            <MdArrowBack
              className="custom_event_dates_header_btn"
              onClick={onBack}
              size={30}
            />
          </div>
        </div>
        <Calendar
          className="calendar"
          multiple
          name="customDates"
          value={data.customDates}
          sort
          onChange={(array) => handleChange(array)}
          format="YYYY-MM-DD"
          plugins={[
            <TimePicker hideSeconds style={{ minWidth: "100px" }} />,
            <DatePanel
              header="  Custom Event Dates"
              markFocused
              focusedClassName="bg-red"
            />,
          ]}
        />
        <div className="custom_event_dates_next_cta">
          <button onClick={toOne} className="custom_event_dates_next_btn">
            Next
          </button>
        </div>
      </div>
      {/* <button onClick={onBack}>Back</button> */}
    </>
  );
}

export default CustomEventRepeat;
