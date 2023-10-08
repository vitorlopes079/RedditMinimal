import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const AllPosts = ({
  title,
  author,
  timeSince,
  numComments,
  videoUrl,
  postId,
  isImagePost,
  imageUrl,
  isVideoLink,
}) => {
  const createMarkup = (html) => {
    return { __html: html };
  };

  function handleImageOrientation(e) {
    const img = e.target;
    if (img.naturalWidth > img.naturalHeight) {
        img.width = 400;
        img.height = 320; 
    } else if (img.naturalWidth < img.naturalHeight) {
        img.width = 320;
        img.height = 400;
    } else {
        img.width = 320;
        img.height = 320;
    }
  }

  return (
    <div className="AllPosts-container">
      <h2>
         <Link to={`post/${postId}`} dangerouslySetInnerHTML={createMarkup(title)} />
      </h2>

      {videoUrl && (
        <video controls width="100%" height="550px">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {isImagePost && !isVideoLink && (
        <img 
          src={imageUrl} 
          alt="Thumbnail" 
          onLoad={handleImageOrientation}
        />
      )}

      <div className="AllPosts-footer">
        <p className="AllPosts-postedBy">
          posted by: <span className="author">{author}</span>
        </p>
        <p className="time-since">{timeSince}</p>
        <p className="comments">
          <FontAwesomeIcon icon={faCommentAlt} color="#8b8c89" />
          {` ${numComments}`}
        </p>
      </div>
    </div>
  );
}

export default AllPosts;