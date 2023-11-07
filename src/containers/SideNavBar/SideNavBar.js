import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./SideNavBar.css";
import SubjectItem from "../SubjectItem/SubjectItem";
import {
  subjectsData,
  additionalSubjectsData,
} from "../../assets/subjectsData";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";

const SideNavBar = ({ onClick }) => {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState("");
  const navigate = useNavigate();

  const handleClick = (subjectText) => {
    onClick(subjectText);
    navigate("/");
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
      <div className="popular ">
        <p onClick={() => handleClick("Popular")} data-testid="popularItem">
          <FontAwesomeIcon icon={faUpLong} className="icon" /> Popular
        </p>
      </div>
      <div className="subjects">
        {subjectsData.map((subject) => (
          <SubjectItem
            key={subject.id}
            icon={subject.icon}
            title={subject.title}
            subjects={subject.topics}
            onSubjectClick={handleClick}
            onToggleSubject={toggleSubject}
            isExpanded={expandedSubject === subject.id}
            
          />
        ))}
      </div>

      <div
        className="hidden-topics"
        style={{ display: showAllTopics ? "block" : "none" }}
      >
        {additionalSubjectsData.map((subject) => (
          <p key={subject.id} onClick={() => handleClick(subject.title)}>
            <FontAwesomeIcon icon={subject.icon} className="icon"/> {subject.title}
          </p>
        ))}
      </div>

      <button
        data-testid="buttonItem"
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