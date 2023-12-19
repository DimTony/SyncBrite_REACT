import React from "react";
import { CiShare2 } from "react-icons/ci";
import { FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import placeholderIcon from "../../../../../images/placeholder.png";
import coverPicPlaceholder from "../../../../../images/cover-placeholder.jpg";

const CenterBottom = () => {
  return (
    <>
      <div className="center_bottom">
        <div className="center_bottom_wrapper">
          <div className="center_bottom_container">
            <div className="center_bottom_col_main">
              <div className="rightbar_col_main_item">
                <div className="rightbar_col_main_item_header">
                  <div className="rightbar_col_main_item_header_img_holder">
                    <img
                      src={placeholderIcon}
                      alt="siderbar_logo_img"
                      className="rightbar_col_main_item_header_img"
                    />
                  </div>
                  <div className="rightbar_col_main_item_header_title_holder">
                    <div className="rightbar_col_main_item_header_title">
                      <div className="rightbar_col_main_item_header_title_name">
                        Profile Name
                      </div>
                      <div className="rightbar_col_main_item_header_title_info">
                        2/2/1991 There
                      </div>
                    </div>
                  </div>
                  <div className="rightbar_col_main_item_header_more_btn_holder">
                    <div className="rightbar_col_main_item_header_more_btn">
                      <HiDotsHorizontal />
                    </div>
                  </div>
                  <div className="rightbar_col_main_item_header_close_btn_holder">
                    <div className="rightbar_col_main_item_header_close_btn">
                      <MdOutlineClose />
                    </div>
                  </div>
                </div>
                <div className="rightbar_col_main_item_content_holder">
                  <div className="rightbar_col_main_item_content">
                    <div className="rightbar_col_main_item_content_text_holder">
                      <div className="rightbar_col_main_item_content_text">
                        {/* Lorem ipsum */}
                      </div>
                    </div>
                    <div className="rightbar_col_main_item_content_img_holder">
                      <img
                        src={coverPicPlaceholder}
                        className="rightbar_col_main_item_content_img"
                        alt="profile_banner_logo_img"
                      />
                    </div>
                  </div>
                </div>
                <div className="rightbar_col_main_item_metrics">
                  <div className="rightbar_col_main_item_metrics_container">
                    <div className="rightbar_col_main_item_metrics_like">
                      2 Likes
                    </div>
                    <div className="rightbar_col_main_item_metrics_comment">
                      3 Comments
                    </div>
                    <div className="rightbar_col_main_item_metrics_share">
                      4 shares
                    </div>
                  </div>
                </div>
                <div className="rightbar_col_main_item_ctas">
                  <div className="rightbar_col_main_item_ctas_item">
                    <div className="rightbar_col_main_item_ctas_item_icon">
                      <FaRegHeart />
                    </div>
                    <div className="rightbar_col_main_item_ctas_item_name">
                      Like
                    </div>
                  </div>
                  <div className="rightbar_col_main_item_ctas_item">
                    <div className="rightbar_col_main_item_ctas_item_icon">
                      <FaRegCommentDots />
                    </div>
                    <div className="rightbar_col_main_item_ctas_item_name">
                      Coment
                    </div>
                  </div>
                  <div className="rightbar_col_main_item_ctas_item">
                    <div className="rightbar_col_main_item_ctas_item_icon">
                      <CiShare2 />
                    </div>
                    <div className="rightbar_col_main_item_ctas_item_name">
                      Share
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
};

export default CenterBottom;
