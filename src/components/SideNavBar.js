import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpLong,
  faGamepad,
  faDumbbell,
  faBriefcase,
  faCoins,
  faTv,
  faChampagneGlasses,
  faDog,
  faFaceGrinStars,
  faPalette,
  faCarSide,
  faDemocrat,
  faPeopleGroup,
  faBuildingColumns,
  faHatCowboy,
  faUtensils,
  faClockRotateLeft,
  faWandSparkles,
  faGavel,
  faSchool,
  faPersonMilitaryRifle,
  faFilm,
  faRadio,
  faPlay,
  faHandshake,
  faCode,
  faBookOpen,
  faFlaskVial,
  faChessBoard,
  faMicrochip,
  faPersonPraying,
  faPlane,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

const SideNavBar = ({ onClick }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState("");

  const handleClick = (event) => {
    onClick(event.target.innerText);
  };

  const toggleSubject = (subjectId) => {
    if (expandedSubject === subjectId) {
      setExpandedSubject(""); // If the subject is already expanded, collapse it.
    } else {
      setExpandedSubject(subjectId); // Otherwise, expand this subject and collapse others.
    }
  };

  return (
    <div className="SideNavBar">
      <div className="popular icon">
        <p>
          <FontAwesomeIcon icon={faUpLong} className="icon" /> Popular
        </p>
      </div>
      <div className="subjects">
        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Gaming")}>
            <p>
              <FontAwesomeIcon icon={faGamepad} /> Gamming
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>

          <div
            className="moreSubjects"
            style={{ display: expandedSubject === "Gaming" ? "block" : "none" }}
          >
            <p onClick={(event) => handleClick(event)}>Valheim</p>
            <p onClick={(event) => handleClick(event)}>Genshin Impact</p>
            <p onClick={(event) => handleClick(event)}>Minecraft</p>
            <p onClick={(event) => handleClick(event)}>Halo Infinite</p>
            <p onClick={(event) => handleClick(event)}>Call of Duty: Warzone</p>
            <p onClick={(event) => handleClick(event)}>Path of Exile</p>
            <p onClick={(event) => handleClick(event)}>
              Hollow Knight: Silksong
            </p>
            <p onClick={(event) => handleClick(event)}>Escape from Tarkov</p>
            <p onClick={(event) => handleClick(event)}>Watch Dogs: Legion</p>
          </div>
        </div>

        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Sports")}>
            <p>
              <FontAwesomeIcon icon={faDumbbell} /> Sports
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>
          <div
            className="moreSubjects"
            style={{ display: expandedSubject === "Sports" ? "block" : "none" }}
          >
            <p onClick={(event) => handleClick(event)}>NFL</p>
            <p onClick={(event) => handleClick(event)}>NBA</p>
            <p onClick={(event) => handleClick(event)}>Megan Anderson</p>
            <p onClick={(event) => handleClick(event)}>Atlanta Hawks</p>
            <p onClick={(event) => handleClick(event)}>Los Angeles Lakers</p>
            <p onClick={(event) => handleClick(event)}>Boston Celtics</p>
            <p onClick={(event) => handleClick(event)}>Arsenal F.C</p>
            <p onClick={(event) => handleClick(event)}>Philadelphia 76ers</p>
            <p onClick={(event) => handleClick(event)}>Premier League</p>
            <p onClick={(event) => handleClick(event)}>UFC</p>
          </div>
        </div>

        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Business")}>
            <p>
              <FontAwesomeIcon icon={faBriefcase} /> Business
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>
          <div
            className="moreSubjects"
            style={{
              display: expandedSubject === "Business" ? "block" : "none",
            }}
          >
            <p onClick={(event) => handleClick(event)}>GameStop</p>
            <p onClick={(event) => handleClick(event)}>Moderna</p>
            <p onClick={(event) => handleClick(event)}>Pfizer</p>
            <p onClick={(event) => handleClick(event)}>Johnson & Johnson</p>
            <p onClick={(event) => handleClick(event)}>AstraZeneca</p>
            <p onClick={(event) => handleClick(event)}>Walgreens</p>
            <p onClick={(event) => handleClick(event)}>Best Buy</p>
            <p onClick={(event) => handleClick(event)}>Novavax</p>
            <p onClick={(event) => handleClick(event)}>SpaceX</p>
            <p onClick={(event) => handleClick(event)}>Tesla</p>
          </div>
        </div>

        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Crypto")}>
            <p>
              <FontAwesomeIcon icon={faCoins} /> Crypto
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>
          <div
            className="moreSubjects"
            style={{ display: expandedSubject === "Crypto" ? "block" : "none" }}
          >
            <p onClick={(event) => handleClick(event)}>Cardano</p>
            <p onClick={(event) => handleClick(event)}>Dogecoin</p>
            <p onClick={(event) => handleClick(event)}>Algorand</p>
            <p onClick={(event) => handleClick(event)}>Bitcoin</p>
            <p onClick={(event) => handleClick(event)}>Litecoin</p>
          </div>
        </div>

        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Television")}>
            <p>
              <FontAwesomeIcon icon={faTv} /> Television
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>
          <div
            className="moreSubjects"
            style={{
              display: expandedSubject === "Television" ? "block" : "none",
            }}
          >
            <p onClick={(event) => handleClick(event)}>
              The Real Housewives of Atlanta
            </p>
            <p onClick={(event) => handleClick(event)}>The Bachelor</p>
            <p onClick={(event) => handleClick(event)}>Sister Wives</p>
            <p onClick={(event) => handleClick(event)}>90 Day Fiancé</p>
            <p onClick={(event) => handleClick(event)}>Wife Swap</p>
            <p onClick={(event) => handleClick(event)}>
              The Amazing Race Australia
            </p>
            <p onClick={(event) => handleClick(event)}>
              Married at First Sight
            </p>
          </div>
        </div>

        <div className="subjectItem">
          <div className="icon" onClick={() => toggleSubject("Celebrity")}>
            <p>
              <FontAwesomeIcon icon={faChampagneGlasses} /> Celebrity
            </p>
            <FontAwesomeIcon icon={faChevronDown} className="arrow" />
          </div>
          <div
            className="moreSubjects"
            style={{
              display: expandedSubject === "Celebrity" ? "block" : "none",
            }}
          >
            <p onClick={(event) => handleClick(event)}>Kim Kardashian</p>
            <p onClick={(event) => handleClick(event)}>Doja Cat</p>
            <p onClick={(event) => handleClick(event)}>Iggy Azalea</p>
            <p onClick={(event) => handleClick(event)}>Anya Taylor-Joy</p>
            <p onClick={(event) => handleClick(event)}>Jamie Lee Curtis</p>
            <p onClick={(event) => handleClick(event)}>Natalie Portman</p>
            <p onClick={(event) => handleClick(event)}>Henry Cavill</p>
            <p onClick={(event) => handleClick(event)}>Millie Bobby Brown</p>
            <p onClick={(event) => handleClick(event)}>Tom Hiddleston</p>
            <p onClick={(event) => handleClick(event)}>Keanu Reeves</p>
          </div>
        </div>

        <div
          className="hidden-topics"
          style={{ display: showAllTopics ? "block" : "none" }}
        >
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faDog} /> Animal and Pets
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faFaceGrinStars} /> Anime
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPalette} /> Art
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faCarSide} /> Cars and Motor Vehicles
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faDemocrat} /> Crafts and DIY
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPeopleGroup} /> Culture, Race and Ethnicity
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faBuildingColumns} /> Ethics and Philosophy
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faHatCowboy} /> Fashion
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faUtensils} /> Food and Drink
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faClockRotateLeft} /> History
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faWandSparkles} /> Hobbies
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faGavel} /> Law
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faSchool} /> Learning and Education
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPersonMilitaryRifle} /> Military
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faFilm} /> Movies
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faRadio} /> Music
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPlay} /> Podcasts and Streamers
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faHandshake} /> Politics
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faCode} /> Programing
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faBookOpen} /> Reading, Writing and
            Literature
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faFlaskVial} /> Science
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faChessBoard} /> Tabletop Games
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faMicrochip} /> Technology
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPersonPraying} /> Religion and Spirituality
          </p>
          <p onClick={(event) => handleClick(event)}>
            <FontAwesomeIcon icon={faPlane} /> Travel
          </p>
        </div>
      </div>

      <button
        className="sideBarButton"
        onClick={() => {
          setShowAllTopics(!showAllTopics);
        }}
      >
        {showAllTopics ? "see less" : "see more"}
      </button>
    </div>
  );
};

export default SideNavBar;
