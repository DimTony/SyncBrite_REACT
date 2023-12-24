import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { TiDocumentText } from "react-icons/ti";
import "../../App.css";
import homePic from "../../images/onboard.png";
import "./HeroSection.css";

function HeroSection() {
  const navigate = useNavigate();

  const handleNav = (url) => {
    navigate(url);
  };

  return (
    <div className="home_hero_wrapper">
      <div className="home_hero_container">
        <div className="home_heroLeft_wrapper">
          <div className="home_heroLeft_container">
            <div className="home_heroLeft_smallText_wrapper">
              <div className="home_heroLeft_smallText_container">
                <span>Let's keep track for you!</span>
              </div>
            </div>
            <div className="home_heroLeft_LargeText_wrapper">
              <div className="home_heroLeft_LargeText_container">
                <span>Empower Your Events with</span>
                <p>SyncBrite</p>
              </div>
            </div>
            <div className="home_heroLeft_MediumText_wrapper">
              <div className="home_heroLeft_MediumText_container">
                <span>
                  Streamline and enhance your event management processes.
                </span>
              </div>
            </div>
            <div className="home_heroLeft_Btns_wrapper">
              <div className="home_heroLeft_Btns_container">
                <button
                  onClick={() => handleNav("/login")}
                  className="home_heroLeft_GetStartedBtn"
                >
                  <p className="p_no_margin">Get Started</p>
                  <FaUserPlus size={25} />
                </button>
                <button
                  onClick={() => handleNav("/docs")}
                  className="home_heroLeft_ReadDocsBtn"
                >
                  <p className="p_no_margin">Read the Docs</p>
                  <TiDocumentText size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="home_heroRight_wrapper">
          <div className="home_heroRight_container">
            <img src={homePic} className="home_heroRight_pic" alt="hero_pic" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
