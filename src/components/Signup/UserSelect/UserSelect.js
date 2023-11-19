import React, { useState, useEffect } from "react";
import "./UserSelect.css";
import { Button } from "../../Button/Button";
import signupIcon from "../../../images/signup-icon.png";
import UserNavbar from "../../Navbar/UserNavbar/UserNavbar";

function UserSelect() {
  const [text, setText] = useState(false);

  const changeButtonText = () => {
    if (window.innerWidth <= 1296) {
      setText(false);
    } else {
      setText(true);
    }
  };

  useEffect(() => {
    changeButtonText();
  }, []);

  window.addEventListener("resize", changeButtonText);

  return (
    <div className="selector_container">
      <UserNavbar />
      <div className="selector_col">
        <div className="selector_text">
          <h1>Select Your Account Type</h1>
        </div>
        <div className="selector_row">
          <div className="selector_left">
            <div className="selector_left_text">
              <h1>Create An Attendee Account</h1>
            </div>
            <ul className="attendee_list">
              <li>Diverse Event Options</li>
              <li>Personalized Recommendations</li>
              <li>Real-Time Updates</li>
              <li>Social Integration</li>
              <li>Exclusive Offers and Rewards</li>
            </ul>
            <Button
              buttonTo="/attendee-signup"
              className="btns"
              buttonStyle="btn_primary"
              buttonSize="btn__large"
            >
              {text ? "SignUp As Attendee" : "Attendee"}
              <img src={signupIcon} className="signup_icon" alt="signup_icon" />
            </Button>
          </div>
          <div className="selector_right">
            <div className="selector_right_text">
              <h1>Create An Organizer Account</h1>
            </div>
            <ul className="attendee_list">
              <li>Efficient Event Management</li>
              <li>Data Analytics and Insights</li>
              <li>Integrated Marketing Campaigns</li>
              <li>Attendee Engagement Tools</li>
              <li>Cost-Effective Solutions</li>
            </ul>
            <Button
              buttonTo="/organizer-signup"
              className="btns"
              buttonStyle="btn_primary"
              buttonSize="btn__large"
            >
              {text ? "SignUp As Organizer" : "Organizer"}
              <img src={signupIcon} className="signup_icon" alt="signup_icon" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSelect;
