import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import NetworkError from "../components/NetworkError";
import PostContent from "../components/PostContent";
import Comments from "../components/Comments";
import "../css/PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [numCommentsToShow, setNumCommentsToShow] = useState(10);

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

  return (
    <div className="PostDetail">
      <PostContent post={post} />
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
