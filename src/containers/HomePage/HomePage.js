import React from "react";
import Loading from "../../components/Loading/Loading";
import NetworkError from "../../components/NetworkError/NetworkError";
import PostContainer from "../../components/PostContainer/PostContainer";

const HomePage = ({ data, isLoading, error }) => {
  function getTimeSincePost(created_utc) {
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedTime = currentTime - created_utc; //
    const secondsInAnHour = 3600;
    const secondsInADay = 86400;

    if (elapsedTime < secondsInAnHour) {
      const minutes = Math.floor(elapsedTime / 60);
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (elapsedTime < secondsInADay) {
      const hours = Math.floor(elapsedTime / secondsInAnHour);
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      const days = Math.floor(elapsedTime / secondsInADay);
      return `${days} day${days === 1 ? "" : "s"} ago`;
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
        const author = post.data.author;
        const timeSince = getTimeSincePost(post.data.created_utc);
        const numComments = post.data.num_comments;

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
        console.log(post);
        return (
          <PostContainer
            isImagePost={isImagePost}
            isVideoLink={isVideoLink}
            videoUrl={videoUrl}
            imageUrl={imageUrl}
            isRedditMedia={isRedditMedia}
            title={post.data.title}
            selftext={post.data.selftext}
            is_video={post.data.is_video}
            url={post.data.url}
            author={author}
            timeSince={timeSince}
            numComments={numComments}
            postId={post.data.id}
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
