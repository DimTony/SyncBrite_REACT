import React from "react";
import "./Result.css";

function Result({ result }) {
  return (
    <div
      className="result_item"
      onClick={(e) => alert(`You clicked on ${result.name}`)}
    >
      {result.name}
    </div>
  );
}

export default Result;
