import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RiCloseCircleFill } from "react-icons/ri";
import axios from "axios";
import "./CoverPicEditModal.css";
import coverPicPlaceholder from "../../../../images/cover-placeholder.jpg";
import signupIcon from "../../../../images/signup-icon.png";

function CoverPicEditModal({ user, editCoverModal, setEditCoverModal }) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["SyncBriteToken"]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [coverPic, setCoverPic] = useState(coverPicPlaceholder);

  const toggleCoverPicEditModal = () => {
    setEditCoverModal(!editCoverModal);
  };

  if (editCoverModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  useEffect(() => {
    if (user.coverPic !== null || user.coverPic !== "") {
      setCoverPic(user.coverPic);
    } else setCoverPic(coverPicPlaceholder);
  }, [user]);

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
          filePreviewDiv.innerHTML = `<img src="${reader.result}" alt="File Preview" style="max-width: 100%; max-height: 100%;" />`;
        }
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const upload = () => {
    setLoading(true);
    const synctoken = cookies.SyncBriteToken;
    const formData = new FormData();
    formData.append("coverPic", file);
    axios
      .patch("http://localhost:8080/api/users/edit/cover-pic", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${synctoken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setError(false);
          toast.success(
            "Cover Pic updated successfully, Please wait for page reload..."
          );
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => {
        console.log("errHere: ", err);
      });
  };

  return (
    <>
      <div className="modal">
        <div onClick={toggleCoverPicEditModal} className="overlay"></div>
        <div className="view_cover_pic_modal-content">
          <h2> Edit Cover Picture</h2>
          <div className="cover_pic_wrapper">
            <div className="view_cover_pic_container">
              <div id="filePreview" className="view_ProfilePic_img_holder">
                <img src={coverPic} className="cover_view_img" />
              </div>
            </div>
            <div className="edit_cover_pic_container">
              <div className="edit_cover_pic_input_container">
                <input
                  type="file"
                  onChange={handleFile}
                  className="upload_cover_pic_input"
                />
              </div>

              <div className="cover_pic_save_button_container">
                <button
                  className="cover_pic_save_button"
                  type="button"
                  onClick={upload}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <button className="close-modal" onClick={toggleCoverPicEditModal}>
            <RiCloseCircleFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default CoverPicEditModal;
