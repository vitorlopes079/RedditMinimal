import React from "react";
import Comment from "./Comment";
import "../css/Comments.css"

const Comments = ({ comments, numCommentsToShow, addMoreComments }) => {
  const displayedComments = comments.slice(0, numCommentsToShow);
  
  return (
    <div className="Comments">
      {displayedComments.map(comment => (
        <Comment key={comment.data.id} comment={comment} />
      ))}
      {comments.length > numCommentsToShow && (
        <button className="showMoreBtn" onClick={addMoreComments}>
          Show more comments
        </button>
      )}
    </div>
  );
};

export default Comments;