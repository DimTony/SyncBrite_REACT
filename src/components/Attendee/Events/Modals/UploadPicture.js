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

function UploadPictureForm({ user, onBack }) {
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

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const syncToken = cookies.SyncBriteToken;
        const url = "https://syncbrite.onrender.comapi/users";
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
      <div>Step 2</div>
      <button onClick={onBack}>Back</button>
    </>
  );
}

export default UploadPictureForm;
