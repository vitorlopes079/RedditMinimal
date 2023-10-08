import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import placeholderImage from "../assets/no_media.png";
import ReactMarkdown from "react-markdown";
import Loading from "./Loading";
import NotFound from "./NotFound";
import NetworkError from "./NetworkError";

function Post() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://www.reddit.com/by_id/t3_${id}.json`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();

        setData(fetchedData);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the post: ", error);
        setIsLoading(false);
        setError(
          "There was an issue fetching the post. Please try again later."
        );
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return <NetworkError error={error} />;
  }

  if (isLoading) {
    return (
      <div className="loading-div">
        <Loading loading={isLoading} />
      </div>
    );
  }

  const post = data.data?.children?.find((child) => child.data.id === id);

  if (!post) {
    return <NotFound />;
  }

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
        img.height = 480;
    } else {
        img.width = 320;
        img.height = 320;
    }
  }

  const createMarkup = (html) => {
    return { __html: html };
  };

  const isRedditMedia = post.data.is_reddit_media_domain;
  const isImagePost = isRedditMedia && post.data.thumbnail !== "self" && !post.data.is_video;
  const isVideoLink = post.data.domain.includes("v.redd.it") && !post.data.is_video;

  const videoUrl = post.data.is_video
    ? post.data.secure_media.reddit_video.fallback_url
    : null;
  const imageUrl = isImagePost ? post.data.url : post.data.thumbnail;

  return (
    <div className="Post-container">
      <h2 dangerouslySetInnerHTML={createMarkup(post.data.title)}></h2>
      {post.data.selftext && (
        <ReactMarkdown>{post.data.selftext}</ReactMarkdown>
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
}

export default Post;