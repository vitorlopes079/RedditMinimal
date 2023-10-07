import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
    navigate('/');
  };

  return (
    <form className="SearchBar-form" onSubmit={handleSubmit}>
      <input
        className="SearchBar-input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit" className="SearchBar-button">
        <FontAwesomeIcon icon={faSearch} aria-hidden="true" className="fa-lg" />
      </button>
    </form>
  );
};

export default SearchBar;
