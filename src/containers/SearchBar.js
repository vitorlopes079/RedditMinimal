import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../css/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    navigate("/");
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit" className="btn">
        <FontAwesomeIcon
          icon={faSearch}
          aria-hidden="true"
          className="fa-lg"
          style={{ fontSize: "1.31rem" }}
        />
      </button>
    </form>
  );
};

export default SearchBar;
