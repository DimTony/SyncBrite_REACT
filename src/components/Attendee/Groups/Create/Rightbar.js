import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";
import { FaMobile, FaMobileAlt } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoDesktop, IoDesktopOutline } from "react-icons/io5";
import { ImHappy } from "react-icons/im";
import { LiaUserTagSolid } from "react-icons/lia";
import "./Create.css";
import "../../Events/Events.css";
import profilePicPlaceholder from "../../../../images/placeholder.png";

function Rightbar({ groupBanner, groupName, privacy, groupBannerURL }) {
  const [profilePic] = useState(
    "https://res.cloudinary.com/dvvgaf1l9/image/upload/v1701036355/placeholder_bluals.png"
  );
  return (
    <>
      <div className="righter_createGroup_wrapper">
        <div className="righter_createGroup_container">
          <div className="righter_createGroup_header_wrapper">
            <div className="righter_createGroup_header_container">
              <div className="righter_createGroup_header_title_wrapper">
                <div className="righter_createGroup_header_title_container">
                  <div className="righter_createGroup_header_title">
                    <span>Desktop Preview</span>
                  </div>
                </div>
              </div>
              <div className="righter_createGroup_header_btns_wrapper">
                <div className="righter_createGroup_header_btns_container">
                  <div className="righter_createGroup_header_desktop_btn_wrapper">
                    <div className="righter_createGroup_header_desktop_btn_container">
                      <div className="righter_createGroup_header_desktop_btn">
                        <IoDesktop size={30} color="#036" />
                      </div>
                    </div>
                  </div>
                  <div className="righter_createGroup_header_mobile_btn_wrapper">
                    <div className="righter_createGroup_header_mobile_btn_container">
                      <div className="righter_createGroup_header_mobile_btn">
                        <FaMobileAlt size={30} color="#036" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="righter_createGroup_preview_wrapper">
            <div className="righter_createGroup_preview_container">
              <div className="righter_createGroup_banner_wrapper">
                <div className="righter_createGroup_banner_container">
                  {/* <img
                    src={
                      groupBannerURL
                        ? groupBannerURL
                        : "https://res.cloudinary.com/dvvgaf1l9/image/upload/v1702580252/create-group-placeholder_ihig14.png"
                    }
                    className={`righter_createGroup_banner ${
                      !groupBannerURL ? "grayscale" : ""
                    }`}
                    alt="banner_img"
                  /> */}
                  {groupBannerURL ? (
                    <img
                      src={groupBannerURL}
                      className="righter_createGroup_banner"
                      alt="Banner"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dvvgaf1l9/image/upload/v1702580252/create-group-placeholder_ihig14.png"
                      className="righter_createGroup_banner grayscale"
                      alt="Placeholder"
                    />
                  )}
                </div>
              </div>
              <div className="righter_createGroup_tag_wrapper">
                <div className="righter_createGroup_groupInfo_wrapper">
                  <div className="righter_createGroup_groupInfo_container">
                    <div
                      className={`righter_createGroup_groupName_wrapper ${
                        groupName === "" ? "grayscale" : ""
                      }`}
                    >
                      <div className="righter_createGroup_groupName_contaner">
                        <span>
                          {groupName === "" ? "Group Name" : groupName}
                        </span>
                      </div>
                    </div>
                    <div className="righter_createGroup_groupStatus_wrapper">
                      <div
                        className={`righter_createGroup_groupStatus_container ${
                          privacy === "" ? "grayscale" : ""
                        }`}
                      >
                        <div className="righter_createGroup_groupPrivacy_wrapper">
                          <div className="righter_createGroup_groupPrivacy_container">
                            <span>{privacy === "" ? "Privacy" : privacy}</span>
                          </div>
                        </div>
                        <div className="righter_createGroup_groupMembers_wrapper">
                          <div className="righter_createGroup_groupMembers_container">
                            <span>• 1 member</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`righter_createGroup_mockBtns_wrapper ${
                    privacy === "" ? "grayscale" : ""
                  }`}
                >
                  <div className="righter_createGroup_mockBtns_container">
                    <div className="righter_createGroup_mockBtns_item_wrapper">
                      <div className="righter_createGroup_mockBtns_item_container">
                        <div className="righter_createGroup_mockBtns_item">
                          <span>About</span>
                        </div>
                      </div>
                    </div>
                    <div className="righter_createGroup_mockBtns_item_wrapper">
                      <div className="righter_createGroup_mockBtns_item_container">
                        <div className="righter_createGroup_mockBtns_item">
                          <span>Posts</span>
                        </div>
                      </div>
                    </div>
                    <div className="righter_createGroup_mockBtns_item_wrapper">
                      <div className="righter_createGroup_mockBtns_item_container">
                        <div className="righter_createGroup_mockBtns_item">
                          <span>Members</span>
                        </div>
                      </div>
                    </div>
                    <div className="righter_createGroup_mockBtns_item_wrapper">
                      <div className="righter_createGroup_mockBtns_item_container">
                        <div className="righter_createGroup_mockBtns_item">
                          <span>Events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`righter_createGroup_mock_wrapper ${
                  privacy === "" || groupName === "" ? "grayscale" : ""
                }`}
              >
                <div className="righter_createGroup_mock_container">
                  <div className="righter_createGroup_mockLeft_wrapper">
                    <div className="righter_createGroup_mockLeft_container">
                      <div className="righter_createGroup_mockLeft_input_wrapper">
                        <div className="righter_createGroup_mockLeft_input_container">
                          <div className="righter_createGroup_mockLeft_inputPic_wrapper">
                            <div className="righter_createGroup_mockLeft_inputPic_container">
                              <img
                                src={profilePic}
                                className="righter_createGroup_mockLeft_inputPic"
                                alt="mockPic"
                              />
                            </div>
                          </div>
                          <div className="righter_createGroup_mockLeft_inputBar_wrapper">
                            <div className="righter_createGroup_mockLeft_inputBar_container">
                              <span>What's on your mind?</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="righter_createGroup_mockLeft_btns_wrapper">
                        <div className="righter_createGroup_mockLeft_btns_container">
                          <div className="righter_createGroup_mockLeft_btns_item_wrapper">
                            <div className="righter_createGroup_mockLeft_btns_item_container">
                              <div className="righter_createGroup_mockLeft_btns_item">
                                <div className="righter_createGroup_mockLeft_btns_item_icon">
                                  <IoMdPhotos />
                                </div>
                                <div className="righter_createGroup_mockLeft_btns_item_text">
                                  Photos/Videos
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="righter_createGroup_mockLeft_btns_item_wrapper">
                            <div className="righter_createGroup_mockLeft_btns_item_container">
                              <div className="righter_createGroup_mockLeft_btns_item">
                                <div className="righter_createGroup_mockLeft_btns_item_icon">
                                  <LiaUserTagSolid />
                                </div>
                                <div className="righter_createGroup_mockLeft_btns_item_text">
                                  Tag people
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="righter_createGroup_mockLeft_btns_item_wrapper">
                            <div className="righter_createGroup_mockLeft_btns_item_container">
                              <div className="righter_createGroup_mockLeft_btns_item">
                                <div className="righter_createGroup_mockLeft_btns_item_icon">
                                  <ImHappy />
                                </div>
                                <div className="righter_createGroup_mockLeft_btns_item_text">
                                  Feeling/Activity
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="righter_createGroup_mockRight_wrapper">
                    <div className="righter_createGroup_mockRight_container">
                      <div className="righter_createGroup_mockRight">
                        <span>About</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rightbar;
