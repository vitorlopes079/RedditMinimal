import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunitesPosts.css"


const CommunitesPosts = ({ onClick }) => {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.reddit.com/subreddits.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();

        setCommunities(result.data.children.slice(0, 5));
        setIsLoading(false);
      } catch (error) {
        console.error(
          "There was an error fetching the communities data: ",
          error
        );
        setIsLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const onCommunityClick = (name) => {
    onClick(`community:${name}`);
    navigate("/");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Communites">
      <header>
        <h4>See posts from our popular communities</h4>
      </header>
      {communities.map((community) => (
        <div
          onClick={() => onCommunityClick(community.data.display_name)}
          className="body"
          key={community.data.id}
        >
          <h4>{community.data.display_name}</h4>
          <p>{community.data.subscribers.toLocaleString()} members</p>
        </div>
      ))}
    </div>
  );
};

export default CommunitesPosts;
