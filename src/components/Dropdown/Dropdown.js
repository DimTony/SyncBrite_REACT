import React from "react";

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <a href={props.url}>{props.text}</a>
    </li>
  );
}

export default DropdownItem;
