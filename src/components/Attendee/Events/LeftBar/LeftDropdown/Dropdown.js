import React from "react";

function EventLeftDropdown(props) {
  return (
    <li className="lefter_event_dropdownItem" onClick={props.onClick}>
      <a className="lefter_event_dropdownItem_link" href={props.url}>
        <div className="lefter_event_dropdownItem_img_container">
          {props.img}
        </div>
        <div className="lefter_event_dropdownItem_text">{props.text}</div>
      </a>
    </li>
  );
}

export default EventLeftDropdown;
