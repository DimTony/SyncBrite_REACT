import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "axios";
import "./EditProfile.css";
import signupIcon from "../../../../images/signup-icon.png";

function EditProfileModal({
  user,
  editSecModal,
  setEditSecModal,
  setPicChanged,
}) {
  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    bio: user.bio,
    dateOfBirth: user.dateOfBirth,
    location: user.location,
    pronouns: user.pronouns,
  });
  const [file, setFile] = useState();
  const [coverFile, setCoverFile] = useState();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePicChanged, setProfilePicChanged] = useState(false);
  const [coverPicChanged, setCoverPicChanged] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const navigate = useNavigate();

  const toggleEditModal = () => {
    setEditSecModal(!editSecModal);
  };

  if (editSecModal) {
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCoverFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!cookies.SyncBriteToken) {
      navigate("/login");
    } else {
      setLoading(true);
      try {
        const syncToken = cookies.SyncBriteToken;
        const url =
          "https://syncbrite-server.onrender.com/api/users/edit/profile";

        const formData = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("bio", data.bio);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("location", data.location);

        axios
          .patch(
            url,
            { data },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${syncToken}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              setMsg(res.message);
              setError(false);
              setPicChanged(true);
              toast.success(
                "Profile updated successfully, Please wait for page reload..."
              );
              setTimeout(() => {
                window.location.reload();
              }, 3000);
            } else {
              toast.error("Failed to update profile");
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err);
          });
      } catch (error) {
        setLoading(false);
        if (!error?.response) {
          setError("Error Connecting To Server!");
        } else if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        } else {
          setError("Failed to update profile");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const syncToken = cookies.SyncBriteToken;
        const url = "https://syncbrite-server.onrender.com/api/users";
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

  return (
    <>
      <div className="modal">
        <div onClick={toggleEditModal} className="overlay"></div>
        <div className="modal-content_header">
          <h2>Edit Profile</h2>

          <div className="modal-content_close_btn">
            <button className="close-modal" onClick={toggleEditModal}>
              <RiCloseCircleFill />
            </button>
          </div>
        </div>
        <div className="modal-content">
          <div className="modal-content_form">
            <form className="modal_form_container" onSubmit={handleSubmit}>
              <p>First Name:</p>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                className="modal_form_input"
              />
              <p>Last Name:</p>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={data.lastName}
                className="modal_form_input"
              />
              <p>Pronouns:</p>
              <input
                type="text"
                name="pronouns"
                onChange={handleChange}
                value={data.pronouns}
                className="modal_form_input"
              />
              <p>Date Of Birth: </p>
              <input
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                value={data.dateOfBirth}
                className="modal_form_input"
              />
              <p>Current City: </p>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                value={data.location}
                className="modal_form_input"
              />

              <p>Bio: </p>
              <textarea
                type="text"
                name="bio"
                value={data.bio}
                onChange={handleChange}
                rows={4}
                maxLength={180}
                className="modal_form_textarea"
              />

              {error && <div className="error_msg">{error}</div>}
              {loading ? (
                <button type="button" className="green_btn" disabled>
                  Loading...
                </button>
              ) : (
                <div className="modal_submit_btn_container">
                  <button type="submit" className="modal_submit_btn">
                    Update Profile
                    <img
                      src={signupIcon}
                      className="signup_icon"
                      alt="signup_icon"
                    />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfileModal;
