import React, { useState } from "react";
import SearchBar from "../Dashboard/SearchBar/SearchBar";
import SearchResultsList from "../Dashboard/SearchBar/Results/SearchResultsList";
import UserNavbar from "../Navbar/UserNavbar/UserNavbar";

function Test() {
  const [results, setResults] = useState([]);
  return (
    <div className="test_container">
      <UserNavbar />
      <div className="search_container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
    </div>
  );
}

export default Test;
