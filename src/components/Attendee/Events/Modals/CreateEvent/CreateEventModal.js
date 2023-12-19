import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { MdArrowBack, MdAddPhotoAlternate } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DatePicker, { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import axios from "axios";
import "./CreateEventModal.css";
import signupIcon from "../../../../../images/signup-icon.png";
import CustomEventRepeatModal from "../CustomEventRepeat/CustomEventRepeat";

function CreateEventModal({
  user,
  createEventModal,
  setCreateEventModal,
  onNext,
  onBanner,
  toOne,
  onClose,
  data,
  setData,
  bannerImageURL,
}) {
  const [disabled, setDisabled] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    eventName: "",
    eventStartDate: "",
    eventStartTime: "",
    eventType: "",
    locationLink: "", // Add a common field for either location or link
  });
  const [isValid, setIsValid] = useState(true);
  const [file, setFile] = useState();
  const [showFirstModal, setShowFirstModal] = useState(true);
  const [holidays, setHolidays] = useState(null);
  const [eventType, setEventType] = useState("");
  const [visibility, setVisibility] = useState("");
  const [repeatType, setRepeatType] = useState("");
  const [bannerHover, setBannerHover] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [coHost, setCoHost] = useState("");
  const [customEventRepeatModal, setCustomEventRepeatModal] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "eventName":
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          eventName: value ? "" : "Event name is required",
        }));
        break;
      case "eventStartDate":
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          eventStartDate: value ? "" : "Start date is required",
        }));
        break;
      case "eventStartTime":
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          eventStartTime: value ? "" : "Start time is required",
        }));
        break;
      case "eventType":
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          eventType: value ? "" : "Event type is required",
        }));
        break;
      case "eventLocation":
      case "link":
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          locationLink: value ? "" : "Location or link is required",
        }));
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    console.log("eeee:", e.target);
    const { name, value } = e.target;
    console.log("nnn: ", name, value);
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEventTypeChange = (e) => {
    console.log("event:", e.target.value);
    setData((prevData) => ({
      ...prevData,
      eventType: e.target.value,
    }));
  };

  const handleVisibilityChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      visibility: e.target.value,
    }));
  };

  const handleRepeatTypeChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      repeatType: e.target.value,
    }));
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

    setData((prevData) => ({
      ...prevData,
      selectedGroups: prevData.selectedGroups.includes(groupName)
        ? prevData.selectedGroups.filter((group) => group !== groupName)
        : [...prevData.selectedGroups, groupName],
    }));
  };

  const handleCoHostChange = (e) => {
    setCoHost(e.target.value);
  };

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!cookies.SyncBriteToken) {
      navigate("/login");
    } else {
      setLoading(true);
      try {
        const syncToken = cookies.SyncBriteToken;
        const url = "http://localhost:8080/api/events/create";

        const formData = new FormData();
        formData.append("bannerImage", data.bannerImage);
        formData.append("eventName", data.eventName);
        formData.append("eventStartDate", data.eventStartDate);
        formData.append("eventStartTime", data.eventStartTime);
        formData.append("eventEndDate", data.eventEndDate);
        formData.append("eventEndTime", data.eventEndTime);
        formData.append("details", data.details);
        formData.append("eventLocation", data.eventLocation);
        formData.append("link", data.link);
        formData.append("visibility", data.visibility);
        formData.append("visibilityGroup", data.visibilityGroup);
        formData.append("eventType", data.eventType);
        formData.append("selectedGroups", data.selectedGroups);
        formData.append("coHostEmail", data.coHostEmail);
        formData.append("repeatType", data.repeatType);
        formData.append("repeatDate", data.repeatDate);
        formData.append("repeatTime", data.repeatTime);
        formData.append("customDates", data.customDates);

        axios
          .post(url, formData, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${syncToken}` },
          })
          .then((res) => {
            if (res.status !== 201) {
              console.log("reshere: ", res);
              generateError(res.message);
            } else {
              toast.success(
                "Event created successfully, Please wait for redirect..."
              );
              const eventId = res.data.event._id;

              setTimeout(() => {
                navigate(`/attendee/events/${eventId}`);
              }, 2000);
            }
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              if (error.response) {
                if (error.response.data.message === "jwt expired") {
                  generateError(
                    "SESSION TIMED-OUT\n REDIRECTING TO LOGIN PAGE..."
                  );
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                }

                generateError(
                  `${error.response.data.message}, PLEASE TRY AGAIN LATER...`
                );
              } else if (error.request) {
                generateError("BAD REQUEST");

                console.error(
                  "No response received. Request details:",
                  error.request
                );
              } else {
                generateError("REQUEST SETUP ERROR");

                console.error(
                  "Request setup error. Error message:",
                  error.message
                );
              }
            } else {
              generateError("INTERNAL SERVER ERROR");
              console.error("Non-Axios error. Error message:", error.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
        if (!error?.response) {
          generateError(`${error?.response?.data?.message}, redirecting...`);
          setTimeout(() => {
            navigate("/attendee/events");
          }, 3000);
        } else if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          generateError(
            `${error.response.data.message}, PLEASE TRY AGAIN LATER`
          );
          setError(error.response.data.message);
        } else {
          generateError("FAILED TO CREATE EVENT");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDates = (date) => {
    console.log(date);
    setHolidays(date);
  };

  const handleToggleEndDate = () => {
    setShowEndDate(!showEndDate);
  };

  const handleBannerMouseOver = () => {
    setBannerHover(true);
  };

  const handleBannerMouseOut = () => {
    setBannerHover(false);
  };

  return (
    <>
      <div className="create_event_modal1_wrapper">
        <ToastContainer />
        <div className="create_event_modal1_container">
          <div className="create_event_modal1_header">
            <div className="create_event_modal1_header_title">
              <h2>Create New Event</h2>
            </div>
            <div className="create_event_modal1_header_btn">
              <RiCloseCircleFill
                onClick={onClose}
                className="create_event_modal1_header_close_btn"
                size={35}
              />
            </div>
          </div>
          <div className="create_event_modal1_content1">
            <div className="create_event_modal1_content_form_container">
              <form
                onSubmit={handleSubmit}
                className="create_event_modal1_content_form"
              >
                <div
                  id="filePreview"
                  onMouseOver={handleBannerMouseOver}
                  onMouseOut={handleBannerMouseOut}
                  className="create_event_modal1_content_banner_container"
                >
                  {bannerImageURL ? (
                    <img
                      src={bannerImageURL}
                      className="create_event_modal1_content_banner"
                      alt="Banner"
                    />
                  ) : (
                    <img src="https://placehold.co/640x374" alt="Placeholder" />
                  )}

                  {/* {bannerHover && ( */}
                  <div className="create_event_modal1_content_banner_img_btn">
                    <div className="create_event_modal1_content_banner_cta">
                      <button
                        onClick={onBanner}
                        className="create_event_modal1_content_banner_img_edit_btn"
                      >
                        <MdAddPhotoAlternate />
                        &nbsp; Add
                      </button>
                    </div>
                  </div>
                  {/* )} */}
                </div>
                <div className="create_event_modal1_content_hostcard">
                  <div className="create_event_modal1_content_host_pic_container">
                    <img
                      src={
                        user ? user.profilePic : "https://placehold.co/20x20"
                      }
                      className="create_event_modal1_content_host_pic"
                    />
                  </div>
                  <div className="create_event_modal1_content_host_info">
                    <div className="create_event_modal1_content_hostname">
                      <h3>{user ? user.fullName : <Skeleton />}</h3>
                    </div>
                    <div className="create_event_modal1_content_hostlink_container">
                      <span>
                        Host --{" "}
                        <a
                          href={
                            user ? `/profile/${user.userName}` : "/profile/..."
                          }
                          className="create_event_modal1_content_hostlink"
                        >
                          Your Profile
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="create_event_modal1_content_eventname">
                  <p>Event Name</p>
                  <input
                    type="text"
                    name="eventName"
                    placeholder="Event Name"
                    onChange={handleChange}
                    value={data.eventName}
                    className="create_event_modal1_form_input"
                  />
                </div>
                <div className="create_event_modal1_content_startdate_container">
                  <div className="create_event_modal1_content_startdate">
                    <p>Start Date</p>
                    <input
                      type="date"
                      name="eventStartDate"
                      onChange={handleChange}
                      value={data.eventStartDate}
                      className="create_event_modal1_form_input"
                    />
                  </div>
                  <div className="create_event_modal1_content_starttime">
                    <p>Start Time: </p>
                    <input
                      type="time"
                      name="eventStartTime"
                      onChange={handleChange}
                      value={data.eventStartTime}
                      className="create_event_modal1_form_input"
                    />
                  </div>
                </div>
                <div className="create_event_modal_form-contentet_enddate_link_container">
                  <a
                    onClick={handleToggleEndDate}
                    className="create_event_modal_form-contentet_enddate_dropdown_btn"
                  >
                    + End date and time
                  </a>
                </div>
                {showEndDate && (
                  <div className="create_event_modal_form-contentet_enddate_container">
                    <div className="create_event_modal1_content_startdate">
                      <p>End Date</p>
                      <input
                        type="date"
                        name="eventEndDate"
                        value={data.eventEndDate}
                        onChange={handleChange}
                        className="create_event_modal1_form_input"
                      />
                    </div>
                    <div className="create_event_modal1_content_endtime">
                      <p>End Time</p>
                      <input
                        type="time"
                        name="eventEndTime"
                        value={data.eventEndTime}
                        onChange={handleChange}
                        className="create_event_modal1_form_input"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label>
                    In Person or Virtual:
                    <select
                      value={data.eventType}
                      onChange={handleEventTypeChange}
                      className="create_event_modal1_form_input"
                      style={{ height: "60px", width: "39.3rem" }}
                    >
                      <option value="">Select Event Type</option>
                      <option value="inPerson">In Person</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </label>
                  {data.eventType === "inPerson" && (
                    <label>
                      Location:
                      <input
                        type="text"
                        name="eventLocation"
                        placeholder="Enter location"
                        onChange={handleChange}
                        value={data.eventLocation}
                        className="create_event_modal1_form_input"
                        style={{ width: "39.3rem" }}
                      />
                    </label>
                  )}

                  {data.eventType === "virtual" && (
                    <label>
                      Link:
                      <input
                        type="text"
                        name="link"
                        placeholder="Enter virtual event link"
                        onChange={handleChange}
                        value={data.link}
                        className={`create_event_modal1_form_input ${
                          isValid ? "" : "invalid"
                        }`}
                        style={{ width: "39.3rem" }}
                      />
                      {!isValid && (
                        <p style={{ color: "red" }}>Invalid link format</p>
                      )}
                    </label>
                  )}
                </div>
                <div>
                  <label>
                    Who can see it:
                    <select
                      value={data.visibility || "public"}
                      onChange={handleVisibilityChange}
                      className="create_event_modal1_form_input"
                      style={{ height: "60px", width: "39.3rem" }}
                      required
                    >
                      <option value="">Select Visibility</option>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                      <option value="Friends">Friends</option>
                      <option value="Group">Group</option>
                    </select>
                  </label>

                  {data.visibility === "Group" && (
                    <div className="create_event_modal_form-contentet_group_visibilty_container">
                      <label>Select Group(s):</label>
                      <div className="create_event_modal_form-contentet_group_options">
                        {groupOptions.map((group) => (
                          <label
                            key={group.value}
                            className="create_event_modal_form-contentet_group_name"
                          >
                            <span className="create_event_modal_form-contentet_group_name_item">
                              {group.label}
                            </span>
                            <div className="create_event_modal_form-contentet_group_input">
                              <input
                                name="selectedGroups"
                                type="checkbox"
                                value={group.value}
                                checked={data.selectedGroups.includes(
                                  group.value
                                )}
                                onChange={handleGroupChange}
                                className="create_event_modal1_form_input"
                                style={{
                                  height: "30px",
                                  margin: "0px",
                                }}
                              />
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <p>What are the details? </p>
                  <textarea
                    type="text"
                    name="details"
                    value={data.details}
                    onChange={handleChange}
                    rows={4}
                    className="create_event_modal1_form_textarea"
                  />
                </div>

                <div>
                  <label>
                    Add Co-Host:
                    <select
                      value={coHost}
                      onChange={handleCoHostChange}
                      className="create_event_modal1_form_input"
                      style={{ height: "60px", width: "39.3rem" }}
                    >
                      <option value="">Select Co-Host</option>
                      <option value="cohost">Add a new Co-Host</option>
                    </select>
                  </label>

                  {/* Input for typing in Co-Host's email */}
                  {coHost === "cohost" && (
                    <label>
                      Co-Host's Email:
                      <input
                        type="email"
                        name="coHostEmail"
                        value={data.coHostEmail}
                        onChange={handleChange}
                        className="create_event_modal1_form_input"
                        style={{ height: "60px", width: "39.3rem" }}
                      />
                    </label>
                  )}
                </div>

                <div>
                  <label>
                    Repeat Event:
                    <select
                      value={data.repeatType}
                      onChange={handleRepeatTypeChange}
                      className="create_event_modal1_form_input"
                      style={{ height: "60px", width: "39.3rem" }}
                    >
                      <option value="">Repeat Event</option>
                      <option value="never">Never</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="custom">Custom</option>
                    </select>
                  </label>

                  {/* Revealing inputs based on the selected repeat type */}
                  {data.repeatType === "daily" ||
                  data.repeatType === "weekly" ? (
                    <div className="create_event_modal1_content_dailyWeekly_container">
                      <label className="create_event_modal1_form_label_flex_half">
                        End Date:
                        <input
                          type="date"
                          name="repeatDate"
                          value={data.repeatDate}
                          onChange={handleChange}
                          className="create_event_modal1_form_input"
                          style={{ height: "60px" }}
                        />
                      </label>
                      <label className="create_event_modal1_form_label_flex_half">
                        End Time:
                        <input
                          type="time"
                          name="repeatTime"
                          value={data.repeatTime}
                          onChange={handleChange}
                          className="create_event_modal1_form_input"
                          style={{ height: "60px" }}
                        />
                      </label>
                    </div>
                  ) : data.repeatType === "custom" ? (
                    <div className="create_event_modal1_content_customdate_btn_container">
                      <button
                        onClick={onNext}
                        className="create_event_modal1_content_customdate_btn"
                      >
                        Select Custom Dates
                      </button>
                    </div>
                  ) : null}
                </div>

                {loading ? (
                  <div className="loading-indicator">Loading...</div>
                ) : (
                  <div className="create_event_modal1_content_submit_btn_container">
                    <button
                      type="submit"
                      className={`create_event_modal1_content_submit_btn${
                        disabled ? "" : "invalid_btn"
                      }`}
                    >
                      Create Event
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={onNext}>Next</button>
      <button onClick={onClose}>Close</button> */}
    </>
  );
}

export default CreateEventModal;
