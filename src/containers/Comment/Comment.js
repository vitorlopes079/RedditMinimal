import React, { useState } from "react";
import Text from "../../components/Text/Text"
import "./Comment.css";

const Comment = ({ comment }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [numRepliesToShow, setNumRepliesToShow] = useState(2); // Initial number of replies to show

  const hasReplies =
    comment.data.replies &&
    comment.data.replies.data &&
    comment.data.replies.data.children.length > 0;
  const displayedReplies = hasReplies
    ? comment.data.replies.data.children.slice(0, numRepliesToShow)
    : [];
  console.log("Comment Data:", comment.data);
  return (
    <div className="Comment">
      <h4>{comment.data.author}</h4>
      <Text text={comment.data.body} maxLength={185} />

      {hasReplies && !showReplies && (
        <button className="btn" onClick={() => setShowReplies(true)}>
          See Answers
        </button>
      )}

      {showReplies && (
        <div className="nested">
          {displayedReplies.map((reply) => (
            <Comment key={reply.data.id} comment={reply} />
          ))}

          {hasReplies &&
            comment.data.replies.data.children.length > numRepliesToShow && (
              <button
                className="btn"
                onClick={() => setNumRepliesToShow((prev) => prev + 2)}
              >
                Show More
              </button>
            )}
        </div>
      )}
    </div>
  );
};

export default Comment;
