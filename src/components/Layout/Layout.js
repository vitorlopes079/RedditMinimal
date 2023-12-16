import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideNavBar from "../../containers/SideNavBar/SideNavBar";
import CommunitesPosts from "../../containers/CommunitesPosts/CommunitesPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

function Layout({ onSearch, handleSearch }) {
  const [isNavVisible, setIsNavVisible] = useState(window.innerWidth > 800);

  useEffect(() => {
    const handleResize = () => setIsNavVisible(window.innerWidth > 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 40,
    display: isNavVisible ? "block" : "none",
  };

  return (
    <div>
      <Header onSearch={onSearch} handleClick={() => handleSearch("popular")} />
      <div className="toggle-nav" onClick={toggleNav}>
        {isNavVisible ? null : (
          <FontAwesomeIcon icon={faChevronRight} className="arrowRight" />
        )}
      </div>
      <SideNavBar
        onClick={onSearch}
        isNavVisible={isNavVisible}
        toggleNav={toggleNav}
      />

      {isNavVisible && window.innerWidth < 800 && (
        <div
          style={overlayStyle}
          onClick={() => {
            setIsNavVisible(false);
          }}
        ></div>
      )}

      <CommunitesPosts onClick={onSearch} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
