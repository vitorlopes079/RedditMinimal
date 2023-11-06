import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import NotFound from "../../components/NotFound/NotFound";
import NetworkError from "../../components/NetworkError/NetworkError";
import PostContainer from "../../components/PostContainer/PostContainer";
import Comments from "../../components/Comments/Comments";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [numCommentsToShow, setNumCommentsToShow] = useState(10);

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

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post
        const postResponse = await fetch(
          `https://www.reddit.com/by_id/t3_${id}.json`
        );
        if (!postResponse.ok) throw new Error("Error fetching the post");
        const postData = await postResponse.json();
        setData(postData);

        // Fetch comments
        const commentsResponse = await fetch(
          `https://www.reddit.com/comments/${id}.json`
        );
        if (!commentsResponse.ok)
          throw new Error("Error fetching the comments");
        const commentsData = await commentsResponse.json();
        setComments(commentsData[1].data.children);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setLoadingComments(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const addMoreComments = () => {
    setNumCommentsToShow((prevState) => prevState + 10);
  };

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

  // Extract the details from post
  const author = post.data.author;
  const timeSince = getTimeSincePost(post.data.created_utc);
  const numComments = post.data.num_comments;

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
    <div className="PostDetail">
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
      />
      {loadingComments ? (
        <Loading />
      ) : (
        <Comments
          comments={comments}
          numCommentsToShow={numCommentsToShow}
          addMoreComments={addMoreComments}
        />
      )}
    </div>
  );
}

export default PostDetail;
