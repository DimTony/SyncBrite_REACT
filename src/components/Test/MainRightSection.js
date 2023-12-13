import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "../Main.css";
import grammarlyIcon from "../../../../images/grammarly.jpg";
import placeholderIcon from "../../../../images/placeholder.png";
import createIcon from "../../../../images/create-icn.png";

function RightSection() {
  return (
    <>
      <div className="right_section_wrapper">
        <div className="right_section">
          <div className="right_container">
            <div className="right_sponsored">
              <div className="right_sponsored_header">
                <h3>Sponsored</h3>
              </div>
              <div className="right_sponsored_items">
                <div>
                  <div className="right_sponsored_item">
                    <a href="/grammarly">
                      <div className="right_sponsored_item_img_container">
                        <img
                          src={grammarlyIcon}
                          className="right_sponsored_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_sponsored_item_text">
                        <span className="right_sponsored_item_title">
                          Grammarly
                        </span>
                        <span className="right_sponsored_item_description">
                          Grammarly is here to help
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="right_sponsored_item">
                    <a href="/grammarly">
                      <div className="right_sponsored_item_img_container">
                        <img
                          src={grammarlyIcon}
                          className="right_sponsored_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_sponsored_item_text">
                        <span className="right_sponsored_item_title">
                          Grammarly
                        </span>
                        <span className="right_sponsored_item_description">
                          Grammarly is here to help
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_contacts">
              <div className="right_contacts_header">
                <div className="right_contacts_header_text">
                  <span>Contacts</span>
                </div>
                <div className="right_contacts_header_search_icon">
                  <i class="fas fa-magnifying-glass" />
                </div>
                <div className="right_contacts_header_ellipses_icon">
                  <i class="fas fa-ellipsis" />
                </div>
              </div>
              <div className="right_contacts_items">
                <div>
                  <div className="right_contacts_item">
                    <a href="/contact-profile-1">
                      <div className="right_contacts_item_img_container">
                        <img
                          src={placeholderIcon}
                          className="right_contacts_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_contacts_item_text">
                        <span className="right_contacts_item_name">
                          John Obi
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="right_contacts_item">
                    <a href="/contact-profile-1">
                      <div className="right_contacts_item_img_container">
                        <img
                          src={placeholderIcon}
                          className="right_contacts_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_contacts_item_text">
                        <span className="right_contacts_item_name">
                          John Obi
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_group_conversations">
              <div className="right_conversations_header">
                <div className="right_conversations_header_text">
                  <span>Group Conversations</span>
                </div>
                <div className="right_conversations_header_search_icon">
                  <i class="fas fa-magnifying-glass" />
                </div>
                <div className="right_conversations_header_ellipses_icon">
                  <i class="fas fa-ellipsis" />
                </div>
              </div>
              <div className="right_conversations_items">
                <div>
                  <div className="right_conversations_item">
                    <a href="/contact-profile-1">
                      <div className="right_conversations_item_img_container">
                        <img
                          src={placeholderIcon}
                          className="right_conversations_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_conversations_item_text">
                        <span className="right_conversations_item_name">
                          John Obi
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="right_conversations_item">
                    <a href="/group/create">
                      <div className="right_conversations_item_img_container">
                        <img
                          src={createIcon}
                          className="right_conversations_item_img"
                          alt="right_item_img"
                        />
                      </div>
                      <div className="right_conversations_item_text">
                        <span className="right_conversations_item_name">
                          Create new group
                        </span>
                      </div>
                    </a>
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

export default RightSection;
