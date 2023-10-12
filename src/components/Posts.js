import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../css/Posts.css"

const Posts = ({
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
        img.width = 480;
        img.height = 320; 
    } else if (img.naturalWidth < img.naturalHeight) {
        img.width = 320;
        img.height = 420;
    } else {
        img.width = 350;
        img.height = 350;
    }
  }

  return (
    <div className="Posts">
      <h2>
         <Link to={`post/${postId}`} dangerouslySetInnerHTML={createMarkup(title)} />
      </h2>

      {videoUrl && (
        <div className="video-container">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      )}

      {isImagePost && !isVideoLink && (
        <img 
          src={imageUrl} 
          alt="Thumbnail" 
          onLoad={handleImageOrientation}
        />
      )}

      <div className="footer">
        <p className="postedBy">
          posted by: <span className="author">{author}</span>
        </p>
        <p className="timeSince">{timeSince}</p>
        <p className="comments">
          <FontAwesomeIcon icon={faCommentAlt} color="#8b8c89" />
          {` ${numComments}`}
        </p>
      </div>
    </div>
  );
}

export default Posts;