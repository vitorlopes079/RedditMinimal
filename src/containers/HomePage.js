import React from "react";
import Loading from "../components/Loading";
import NetworkError from "../components/NetworkError";
import Posts from "../components/Posts";

const HomePage = ({ data, isLoading, error }) => {
  function getTimeSincePost(created_utc) {
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - created_utc; //
    const secondsInAnHour = 3600;
    const secondsInADay = 86400;
    

    if (elapsedTime < secondsInAnHour) {
      return `${Math.floor(elapsedTime / 60)} minutes ago`;
    } else if (elapsedTime < secondsInADay) {
      return `${Math.floor(elapsedTime / secondsInAnHour)} hours ago`;
    } else {
      return `${Math.floor(elapsedTime / secondsInADay)} days ago`;
    }
  }

  function content() {
    if (isLoading) {
      return (
        <div className="loading-div">
          <Loading loading={isLoading} />
        </div>
      );
    }
    if (error) {
      // Check if there's an error
      return <NetworkError error={error} />;
    }

    if (data) {
      return data.data.children.map((post) => {
        const title = post.data.title;
        const author = post.data.author;
        const timeSince = getTimeSincePost(post.data.created_utc);
        const numComments = post.data.num_comments;
        const key = post.data.id;
        const isRedditMedia = post.data.is_reddit_media_domain;
        const isImagePost =
          isRedditMedia &&
          post.data.thumbnail !== "self" &&
          !post.data.is_video;
        const isVideoLink =
          post.data.domain.includes("v.redd.it") && !post.data.is_video;
        const videoUrl = post.data.is_video
          ? post.data.secure_media.reddit_video.fallback_url
          : null;
        const imageUrl = isImagePost ? post.data.url : post.data.thumbnail;

        return (
          <Posts
            title={title}
            author={author}
            timeSince={timeSince}
            numComments={numComments}
            key={key}
            isRedditMedia={isRedditMedia}
            isImagePost={isImagePost}
            postId={key}
            videoUrl={videoUrl}
            imageUrl={imageUrl}
            isVideoLink={isVideoLink}
          />
        );
      });
    } else {
      return (
        <div className="loading-div">
          <Loading loading={isLoading} />
        </div>
      );
    }
  }
  return <div className="Posts-container">{content()}</div>;
};

export default HomePage;
