import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdPhoto } from "react-icons/md";
import axios from "axios";
import "./ProfilePicEditModal.css";
import signupIcon from "../../../../images/signup-icon.png";

function EditProfilePictureModal({
  user,
  editProfileModal,
  setEditProfileModal,
  setPicChanged,
}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const togglePicEditModal = () => {
    setEditProfileModal(!editProfileModal);
  };

  if (editProfileModal) {
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

  const upload = () => {
    setLoading(true);
    const synctoken = cookies.SyncBriteToken;
    const formData = new FormData();
    formData.append("profilePic", file);
    axios
      .patch(
        "https://syncbrite.onrender.com/api/users/edit/profile-pic",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${synctoken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setError(false);
          toast.success(
            "Profile Pic updated successfully, Please wait for page reload..."
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("errHere: ", err);
        if (err.response.data.error.name === "TokenExpiredError") {
          navigate("/login");
        }
      });
  };

  return (
    <>
      <div className="modal">
        <ToastContainer />
        <div onClick={togglePicEditModal} className="overlay"></div>
        <div className="profile_pic_modal_content">
          <h2>Edit Profile Picture</h2>

          <div id="filePreview" className="profile_pic_container">
            <img
              src={user.profilePic}
              alt="user_profile_pic"
              className="modal_profile_pic"
            />
          </div>

          <div className="profile_pic_input_container">
            <input
              type="file"
              onChange={handleFile}
              className="upload_profile_pic_input"
            />
          </div>

          <button
            className="profile_pic_save_button"
            type="button"
            onClick={upload}
          >
            Save
          </button>

          <button className="close-modal" onClick={togglePicEditModal}>
            <RiCloseCircleFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default EditProfilePictureModal;
