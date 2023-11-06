import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SubjectItem.css";
import { faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const SubjectItem = ({
  icon,
  title,
  subjects,
  onSubjectClick,
  onToggleSubject,
  isExpanded,
}) => {
  return (
    <div className="subjectItem">
      <div className="subjectContainer" onClick={() => onToggleSubject(title)}>
        <p>
          <FontAwesomeIcon icon={icon} className="icon"/> {title}
        </p>
        {isExpanded ? <FontAwesomeIcon icon={faChevronUp} className="arrow" />:<FontAwesomeIcon icon={faChevronDown} className="arrow" />}
      </div>
      <div
        className="moreSubjects"
        style={{ display: isExpanded ? "block" : "none" }}
      >
        {subjects.map((subject, index) => (
          <p key={index} onClick={() => onSubjectClick(subject)}>
            {subject}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SubjectItem;
