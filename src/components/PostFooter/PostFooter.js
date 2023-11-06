import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";
import "./PostFooter.css";

const PostFooter = ({ author, timeSince, numComments }) => {
  return (
    <div className="PostFooter">
      <p className="postedBy">
        posted by: <span className="author">{author}</span>
      </p>
      <p className="timeSince">{timeSince}</p>
      <p className="comments">
        <FontAwesomeIcon
          icon={faCommentAlt}
          color="#8b8c89"
          data-testid="comment-icon"
        />
        {` ${numComments}`}
      </p>
    </div>
  );
};

export default PostFooter;
