import React from "react";
import Result from "./Result";
import "./SearchResultsList.css";

function SearchResultsList({ results }) {
  return (
    <div className="results_list">
      {results.map((result, id) => {
        return <Result result={result} key={id} />;
      })}
    </div>
  );
}

export default SearchResultsList;
