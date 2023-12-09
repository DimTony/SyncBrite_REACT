import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./ViewCoverPicModal.css";
import coverPicPlaceholder from "../../../../images/cover-placeholder.jpg";

function ViewCoverPicModal({ user, coverView, setCoverView }) {
  const toggleCoverView = () => {
    setCoverView(!coverView);
  };

  return (
    <>
      <div className="modal">
        <div onClick={toggleCoverView} className="overlay"></div>
        <div className="view_cover_pic_modal_content">
          <h2> View Cover Picture</h2>
          <div className="cover_pic_view_container">
            <div className="view_ProfilePic_img_holder">
              <img
                src={user ? user.coverPic : coverPicPlaceholder}
                className="view_cover_img"
              />
            </div>
          </div>
          <button className="close-modal" onClick={toggleCoverView}>
            <RiCloseCircleFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewCoverPicModal;
