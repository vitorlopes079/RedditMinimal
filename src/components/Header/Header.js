import React from "react";
import SearchBar from "../../containers/SearchBar/SearchBar";
import logo from "../../assets/logo.png";
import "./Header.css";

const Header = ({ onSearch }) => {
  return (
    <nav className="Header" >
      <div className="logo">
        <img src={logo} alt="logo" width="50px" heigh="55px" />
        <h4>
          <span>Reddit</span>Minimal
        </h4>
      </div>

      <SearchBar onSearch={onSearch} />
    </nav>
  );
};

export default Header;
