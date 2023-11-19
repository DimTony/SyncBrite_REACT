import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn__primary", "btn__outline", "btn__cta"];

const SIZES = ["btn__medium", "btn__large"];

const TEXTCOLOR = ["btn__white", "btn__midnight"];

const URL = [
  "/",
  "/login",
  "/docs",
  "/signup",
  "/user-select",
  "/attendee-signup",
  "/organizer-signup",
  "/dashboard",
  "/attendee-dashboard",
  "/groups",
  "/events",
  "/notifications",
  "/profile",
  "/settings",
  "/support",
  "/feedback",
  "/admin",
  "/logout",
];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  buttonTextColor,
  buttonTo,
}) => {
  const checkButtontyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const checkButtonTextColor = TEXTCOLOR.includes(buttonTextColor)
    ? buttonTextColor
    : TEXTCOLOR[0];

  const checkButtonTo = URL.includes(buttonTo) ? buttonTo : URL[0];

  return (
    <Link to={checkButtonTo} className="btn_mobile">
      <button
        className={`btn ${checkButtontyle} ${checkButtonSize} ${checkButtonTextColor}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
};
