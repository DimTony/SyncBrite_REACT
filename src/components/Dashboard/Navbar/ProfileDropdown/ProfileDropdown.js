import React from "react";

function ProfileDropdownItem(props) {
  return (
    <li className="profile_dropdownItem" onClick={props.onClick}>
      <a href={props.url}>
        <div className="profile_dropdownItem_img">{props.img}</div>
        <div className="profile_dropdownItem_text">{props.text}</div>
      </a>
    </li>
  );
}

export default ProfileDropdownItem;
