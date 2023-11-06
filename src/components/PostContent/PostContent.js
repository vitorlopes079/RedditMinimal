import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import placeholderImage from "../../assets/no_media.png";
import "./PostContent.css";

const PostContent = ({ post }) => {
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

  const isRedditMedia = post.data.is_reddit_media_domain;
  const isImagePost =
    isRedditMedia && post.data.thumbnail !== "self" && !post.data.is_video;
  const isVideoLink =
    post.data.domain.includes("v.redd.it") && !post.data.is_video;

  const videoUrl = post.data.is_video
    ? post.data.secure_media.reddit_video.fallback_url
    : null;
  const imageUrl = isImagePost ? post.data.url : post.data.thumbnail;

  return (
    <div className="PostContent">
      <h2 dangerouslySetInnerHTML={createMarkup(post.data.title)}></h2>

      {post.data.selftext && (
        <ReactMarkdown remarkPlugins={[gfm]}>
          {post.data.selftext}
        </ReactMarkdown>
      )}

      {post.data.is_video && (
        <div className="video-container">
          <video controls data-testid="video-element"> 
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {isImagePost && (
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
              <a href={post.data.url} target="_blank" rel="noopener noreferrer">
                View video on Reddit
              </a>
            </p>
          )}
        </div>
      )}

      {isRedditMedia && !isImagePost && !post.data.is_video && !isVideoLink && (
        <div>
          <img src={imageUrl} alt="Thumbnail" onError={handleImageError} />
          <p>
            <a href={post.data.url} target="_blank" rel="noopener noreferrer">
              View content on Reddit
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PostContent;
