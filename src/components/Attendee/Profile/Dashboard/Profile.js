import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import axios from "axios";
import "./Profile.css";
import profilePicPlaceholder from "../../../../images/placeholder.png";
import AttendeeNavbar from "../../Navbar/AttendeeNavbar";
import Leftbar from "../LeftBar/Leftbar";
import Rightbar from "../Rightbar/Rightbar";

function Profile() {
  const [user, setUser] = useState(null);

  const [data, setData] = useState({
    profilePic1: "",
  });
  const [file, setFile] = useState();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [viewProfileModal, setViewProfileModal] = useState(false);
  const [editCoverModal, setEditCoverModal] = useState(false);
  const [editSecModal, setEditSecModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formUpdated, setFormUpdated] = useState(false);
  const [picChanged, setPicChanged] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePicPlaceholder);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [profilePicHover, setProfilePicHover] = useState(false);
  const [coverPicHover, setCoverPicHover] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies([]);

  const generateError = (err) =>
    toast.error(err, {
      position: "top-right",
    });

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href;
      const userNameMatch = url.match(/\/profile\/([^/]+)/);

      if (userNameMatch) {
        try {
          if (!cookies.SyncBriteToken) {
            navigate("/login");
          } else {
            const username = userNameMatch[1];

            const { data } = await axios.post(
              "http://localhost:8080/api/auth/verify-cookie",
              {},
              { withCredentials: true }
            );

            if (!data.success || data.user.userName !== username) {
              setIsLoggedIn(false);
              setCookie("SyncBriteToken", "none", { path: "/" });
              removeCookie("SyncBriteToken");
              navigate("/login");
            } else {
              setUser(data.user);
              setProfilePicture(data.user.profilePic);
              setIsLoggedIn(true);
            }
          }
        } catch (error) {
          setIsLoggedIn(false);
          removeCookie("SyncBriteToken");
          navigate("/login");
          generateError(error);
        }
      } else {
        setIsLoggedIn(false);
        removeCookie("SyncBriteToken");
        navigate("/login");
        generateError("Something went wrong!!!");
      }
    };

    fetchData();
  }, [navigate, removeCookie, setIsLoggedIn, picChanged]);

  if (!isLoggedIn) {
    navigate("/login");
  }

  if (!user) {
    navigate("/login");
  }

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  if (editModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const togglePicEditModal = () => {
    setEditProfileModal(!editProfileModal);
  };

  const toggleViewModal = () => {
    setViewProfileModal(!viewProfileModal);
  };

  const toggleCoverEditModal = () => {
    setEditCoverModal(!editCoverModal);
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleAnotherFileChange = (e) => {
    console.log(user);
  };

  const handleSubmit = (e) => {
    console.log(user);
  };

  const toggleEditSecModal = () => {
    setEditSecModal(!editSecModal);
  };

  if (editSecModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handlePicMouseOver = () => {
    setProfilePicHover(true);
  };

  const handlePicMouseOut = () => {
    setProfilePicHover(false);
  };

  const handleCoverMouseOver = () => {
    setCoverPicHover(true);
  };

  const handleCoverMouseOut = () => {
    setCoverPicHover(false);
  };

  return (
    <>
      <ToastContainer />
      {isLoggedIn && (
        <div className="main_container">
          <AttendeeNavbar
            userData={user}
            cookies={cookies}
            removeCookie={removeCookie}
            formUpdated={formUpdated}
            setUser={setUser}
          />
          <div className="wrapper">
            <Leftbar user={user} />
            <Rightbar user={user} />
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
