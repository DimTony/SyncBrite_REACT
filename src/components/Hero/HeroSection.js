import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../App.css";
import { Button } from "../Button/Button";
import homePic from "../../images/onboard.png";
import signupIcon from "../../images/signup-icon.png";
import docIcon from "../../images/doc-icon.png";
import "./HeroSection.css";

function HeroSection() {
  return (
    <Row className="hero_row">
      <Col md={7}>
        <div className="hero_container left">
          <h2 className="hero_medium_text">
            <span className="hero_medium_span">•</span>Let's keep track for you!
          </h2>
          <h1 className="hero_large_text">
            Empower Your Events with&nbsp;
            <p className="brand_text">SyncBrite</p>
          </h1>
          <p>Streamline and enhance your event management process.</p>
          <div className="hero_btns">
            <Button
              buttonTo="/login"
              className="btns"
              buttonStyle="btn_primary"
              buttonSize="btn__large"
            >
              Get Started
              <img src={signupIcon} className="signup_icon" alt="signup_icon" />
            </Button>
            <Button
              buttonTo="/docs"
              className="btns"
              buttonStyle="btn__outline"
              buttonSize="btn__large"
            >
              Read the Docs{" "}
              <img src={docIcon} className="doc_icon" alt="doc_icon" />
            </Button>
            <Button
              buttonTo="/admin"
              className="btns"
              buttonStyle="btn__outline"
              buttonSize="btn__large"
            >
              Admin <img src={docIcon} className="doc_icon" alt="doc_icon" />
            </Button>
          </div>
        </div>
      </Col>
      <Col md={5}>
        <div className="hero_container right">
          <div className="home_pic_container">
            <img src={homePic} className="home_pic" alt="hero_pic" />
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default HeroSection;
