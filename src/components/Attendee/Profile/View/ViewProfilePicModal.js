import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import profilePicPlaceholder from "../../../../images/placeholder.png";

function ViewProfilePicModal({ user, viewProfileModal, setViewProfileModal }) {
  const toggleViewModal = () => {
    setViewProfileModal(!viewProfileModal);
  };

  return (
    <>
      <div className="modal">
        <div onClick={toggleViewModal} className="overlay"></div>
        <div className="profile_pic_view_modal_content">
          <h2> View Profile Pic</h2>
          <div className="view_profile_pic_container">
            <div className="view_ProfilePic_img_holder">
              <img
                src={user ? user.profilePic : profilePicPlaceholder}
                className="view_ProfilePic_img"
              />
            </div>
          </div>
          <button className="close-modal" onClick={toggleViewModal}>
            <RiCloseCircleFill />
          </button>
        </div>
      </div>
    </>
  );
}

export default ViewProfilePicModal;
