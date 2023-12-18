import React, { useState } from "react";
import { FaEllipsisH, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Discussion from "./Discussion/Discussion";
import Events from "./Events/Events";
import Media from "./Media/Media";
import Files from "./Files/Files";
import Members from "./Members/Members";
import "./Home.css";

function Home({ user, group }) {
  const [currentRightBottom, setCurrentRightBottom] = useState(1);

  const handlePagerClick = (pageNumber) => {
    setCurrentRightBottom(pageNumber);
  };

  return (
    <>
      <div className="superAdmin_groups_right_wrapper">
        <div className="superAdmin_groups_right_container">
          <div className="superAdmin_groups_rightTop_wrapper">
            <div className="superAdmin_groups_rightTop_container">
              <div className="superAdmin_groups_rightTop_banner_wrapper">
                <div className="superAdmin_groups_rightTop_banner_container">
                  <img
                    src={group.groupImage}
                    className="superAdmin_groups_rightTop_banner"
                    alt="group_img"
                  />
                </div>
              </div>
              <div className="superAdmin_groups_rightTop_groupTag_wrapper">
                <div className="superAdmin_groups_rightTop_groupTag_container">
                  <div className="superAdmin_groups_rightTop_groupInfo_wrapper">
                    <div className="superAdmin_groups_rightTop_groupInfo_container">
                      <div className="superAdmin_groups_rightTop_groupName_wrapper">
                        <div className="superAdmin_groups_rightTop_groupName_container">
                          <span>Group Name</span>
                        </div>
                      </div>
                      <div className="superAdmin_groups_rightTop_groupInvite_wrapper">
                        <div className="superAdmin_groups_rightTop_groupInvite_container">
                          <button className="superAdmin_groups_rightTop_groupInvite_btn">
                            Invite
                          </button>
                          <button className="superAdmin_groups_rightTop_groupShare_btn">
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="superAdmin_groups_rightTop_groupBtns_wrapper">
                    <div className="superAdmin_groups_rightTop_groupBtns_container">
                      <div className="superAdmin_groups_rightTop_pageBtns_wrapper">
                        <div className="superAdmin_groups_rightTop_pageBtns_container">
                          <div
                            onClick={() => handlePagerClick(1)}
                            className={`superAdmin_groups_rightTop_pager_wrapper ${
                              currentRightBottom === 1
                                ? "rightTop_pager_active"
                                : ""
                            }`}
                          >
                            <div className="superAdmin_groups_rightTop_pager_container">
                              <span>Discussions</span>
                            </div>
                          </div>
                          <div
                            onClick={() => handlePagerClick(2)}
                            className={`superAdmin_groups_rightTop_pager_wrapper ${
                              currentRightBottom === 2
                                ? "rightTop_pager_active"
                                : ""
                            }`}
                          >
                            <div className="superAdmin_groups_rightTop_pager_container">
                              <span>Events</span>
                            </div>
                          </div>
                          <div
                            onClick={() => handlePagerClick(3)}
                            className={`superAdmin_groups_rightTop_pager_wrapper ${
                              currentRightBottom === 3
                                ? "rightTop_pager_active"
                                : ""
                            }`}
                          >
                            <div className="superAdmin_groups_rightTop_pager_container">
                              <span>Media</span>
                            </div>
                          </div>
                          <div
                            onClick={() => handlePagerClick(4)}
                            className={`superAdmin_groups_rightTop_pager_wrapper ${
                              currentRightBottom === 4
                                ? "rightTop_pager_active"
                                : ""
                            }`}
                          >
                            <div className="superAdmin_groups_rightTop_pager_container">
                              <span>Files</span>
                            </div>
                          </div>
                          <div
                            onClick={() => handlePagerClick(5)}
                            className={`superAdmin_groups_rightTop_pager_wrapper ${
                              currentRightBottom === 5
                                ? "rightTop_pager_active"
                                : ""
                            }`}
                          >
                            <div className="superAdmin_groups_rightTop_pager_container">
                              <span>Members</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="superAdmin_groups_rightTop_filterBtns_wrapper">
                        <div className="superAdmin_groups_rightTop_filterBtns_container">
                          <button className="superAdmin_groups_rightTop_filterBtn">
                            <IoMdSearch size={30} />
                          </button>
                          <button className="superAdmin_groups_rightTop_filterBtn">
                            <FaEllipsisH size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="superAdmin_groups_rightBottom_wrapper">
            {currentRightBottom === 1 && (
              <Discussion user={user} group={group} />
            )}

            {currentRightBottom === 2 && <Events />}

            {currentRightBottom === 3 && <Media />}

            {currentRightBottom === 4 && <Files />}

            {currentRightBottom === 5 && <Members />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
