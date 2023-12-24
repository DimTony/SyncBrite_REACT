import React from "react";

function GroupLeftDropdown(props) {
  return (
    <li className="lefter_group_dropdownItem" onClick={props.onClick}>
      <a className="lefter_group_dropdownItem_link" href={props.url}>
        <div className="lefter_group_dropdownItem_img_container">
          {props.img}
        </div>
        <div className="lefter_group_dropdownItem_text">{props.text}</div>
      </a>
    </li>
  );
}

export default GroupLeftDropdown;
