import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import placeholderImage from "../../assets/no_media.png";
import "./PostContainer.css";
import PostFooter from "../PostFooter/PostFooter";
import { Link } from "react-router-dom";

const PostContainer = ({
  isImagePost,
  isVideoLink,
  videoUrl,
  imageUrl,
  isRedditMedia,
  title,
  selftext,
  is_video,
  url,
  author,
  timeSince,
  numComments,
  postId,
}) => {
  function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = placeholderImage;
  }

  function handleImageOrientation(e) {
    const img = e.target;
    const container = img.parentElement;

    // Reset all classes first
    container.classList.remove("landscape", "vertical", "square");

    if (img.naturalWidth > img.naturalHeight) {
      container.classList.add("landscape");
    } else if (img.naturalWidth < img.naturalHeight) {
      container.classList.add("vertical");
    } else {
      container.classList.add("square");
    }
  }

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <div className="PostContainer">
      {postId ? (
        <h1>
          <Link
            to={`post/${postId}`}
            dangerouslySetInnerHTML={createMarkup(title)}
          />
        </h1>
      ) : (
        <h1 dangerouslySetInnerHTML={createMarkup(title)}></h1>
      )}

      {selftext && (
        <ReactMarkdown remarkPlugins={[gfm]}>{selftext}</ReactMarkdown>
      )}

      {is_video && (
        <div className="video-container">
          <video controls data-testid="video-element">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {!is_video && isImagePost && (
        <div className="image-container">
          <img
            src={imageUrl}
            alt="Post media"
            onLoad={handleImageOrientation}
            onError={handleImageError}
            loading="lazy"
          />
          {isVideoLink && (
            <p className="conditional">
              <a href={url} target="_blank" rel="noopener noreferrer">
                View video on Reddit
              </a>
            </p>
          )}
        </div>
      )}

      {isRedditMedia && !isImagePost && !is_video && !isVideoLink && (
        <div>
          <img src={imageUrl} alt="Thumbnail" onError={handleImageError} />
          <p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              View content on Reddit
            </a>
          </p>
        </div>
      )}
      <PostFooter
        author={author}
        timeSince={timeSince}
        numComments={numComments}
      />
    </div>
  );
};

export default PostContainer;
