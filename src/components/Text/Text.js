import React, { useState } from "react";
import "./Text.css";
const Text = ({ text = "", maxLength = 185 }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Ensuring text is a string and truncating it
  const truncatedText =
    text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

  return (
    <span className="Text">
      {showFullText ? text : truncatedText}
      {text.length > maxLength && (
        <button
          className="read-more"
          onClick={() => setShowFullText(!showFullText)}
        >
          {showFullText ? "Read less" : "Read more"}
        </button> 
      )}
    </span>
  );
};

export default Text;
 