import React, { useState } from 'react';

const Text = ({ text = '', maxLength = 100 }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Ensuring text is a string and truncating it
  const truncatedText = text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <span className="text">
      {showFullText ? text : truncatedText}
      {text.length > maxLength && !showFullText && (
        <button className="read-more" onClick={() => setShowFullText(true)}>
          Read more
        </button>
      )}
    </span>
  );
};

export default Text;