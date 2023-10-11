import React from "react";
import Comment from "./Comment";

const Comments = ({ comments, numCommentsToShow, addMoreComments }) => {
  const displayedComments = comments.slice(0, numCommentsToShow);
  
  return (
    <div className="Comments-container">
      {displayedComments.map(comment => (
        <Comment key={comment.data.id} comment={comment} />
      ))}
      {comments.length > numCommentsToShow && (
        <button className="button-30" onClick={addMoreComments}>
          Show more comments
        </button>
      )}
    </div>
  );
};

export default Comments;