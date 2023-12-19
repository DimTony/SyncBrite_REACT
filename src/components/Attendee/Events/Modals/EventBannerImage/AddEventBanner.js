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
import "./AddEventBanner.css";

function AddEventBanner({
  toOne,
  data,
  setData,
  bannerImageURL,
  setBannerImageURL,
}) {
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

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];

    // displayFilePreview(selectedFile);

    setData((prevData) => ({
      ...prevData,
      bannerImage: selectedFile,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setBannerImageURL(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <div className="event_banner_modal2_wrapper">
        <div className="event_banner_header">
          <h2>Add Event</h2>
          <div className="event_banner_header_btn_container">
            <MdArrowBack
              className="event_banner_header_btn"
              onClick={toOne}
              size={30}
            />
          </div>
        </div>
        <div className="event_banner_content_wrapper">
          <div className="event_banner_content_pic_wrapper">
            <div
              id="filePreview"
              className="event_banner_content_pic_container"
            >
              {bannerImageURL ? (
                <img
                  src={bannerImageURL}
                  className="event_banner_content_pic"
                  alt="Banner"
                />
              ) : (
                <img src="https://placehold.co/640x374" alt="Placeholder" />
              )}
            </div>
          </div>
          <div className="event_banner_content_input_wrapper">
            <div className="event_banner_content_input_container">
              <input
                type="file"
                onChange={handleFile}
                className="event_banner_content_input"
              />
            </div>
          </div>
          <div className="event_banner_content_next_cta">
            <button onClick={toOne} className="event_banner_content_next_btn">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* <button onClick={onBack}>Back</button> */}
    </>
  );
}

export default AddEventBanner;
