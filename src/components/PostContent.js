import React from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import placeholderImage from "../assets/no_media.png"; 

const PostContent = ({ post }) => {
  function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = placeholderImage;
  }

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
    <div className="Post-container">
      <h2 dangerouslySetInnerHTML={createMarkup(post.data.title)}></h2>
      
      {post.data.selftext && (
        <ReactMarkdown remarkPlugins={[gfm]}>
          {post.data.selftext}
        </ReactMarkdown>
      )}

      {post.data.is_video && (
        <video controls width="100%" height="550px">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {isImagePost && (
        <div>
          <img
            src={imageUrl}
            alt="Post media"
            onLoad={handleImageOrientation}  
            onError={handleImageError}
          />
          {isVideoLink && (
            <p className="Post-conditional">
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