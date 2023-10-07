import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

function AllPosts({
  title,
  author,
  timeSince,
  numComments,
  videoUrl,
  isRedditMedia,
  postId,
  isImagePost,
  imageUrl,
  isVideoLink,
}) {
  return (
    <div className="AllPosts-container">
      <h2>
        <Link to={`post/${postId}`}>{title}</Link>{" "}
      </h2>

      {videoUrl && (
        <video controls width="100%" height="550px">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {isImagePost && !isVideoLink && (
        <img src={imageUrl} alt="Thumbnail" width="280px" height="280px" />
      )}

      <div className="AllPosts-footer">
        <p className="AllPosts-postedBy">
          posted by: <span className="author">{author}</span>
        </p>
        <p className="time-since">{timeSince}</p>
        <p className="comments">
          {<FontAwesomeIcon icon={faCommentAlt} color="#8b8c89" />}{" "}
          {numComments}
        </p>
      </div>
    </div>
  );
}

export default AllPosts;
