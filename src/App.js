import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetail from "./containers/PostDetail/PostDetail";
import NotFound from "./components/NotFound/NotFound";
import AppTracking from "./containers/AppTracking/AppTracking";

function App() {
  const [data, setData] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch data from the Reddit API
    const fetchData = async () => {
      // Determine the endpoint based on the presence of a searchTerm
      const endpoint = searchTerm
        ? searchTerm.startsWith("r/")
          ? `https://www.reddit.com/${searchTerm}.json`
          : `https://www.reddit.com/search.json?q=${encodeURIComponent(
              searchTerm
            )}`
        : "https://www.reddit.com/r/popular.json";

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data: ", error);
        setData(""); // Resetting the data here
        setIsLoading(false);
        setError(
          "There was an issue fetching the posts. Please try again later."
        );
      }
    };

    // Trigger the fetchData function when necessary
    if (triggerSearch) {
      fetchData();
      setTriggerSearch(false);
    }
  }, [triggerSearch, searchTerm]);

  // Handle search submission
  const handleSearch = (term) => {
    if (term.startsWith("community:")) {
      setSearchTerm(`r/${term.split("community:")[1]}`);
    } else if (term.toLowerCase() === "popular") {
      setSearchTerm("");
    } else {
      setSearchTerm(term);
    }
    setTriggerSearch(true);
    setIsLoading(true);
  };

  return (
    <Router>
      <AppTracking />
      <Routes>
        <Route path="/" element={<Layout onSearch={handleSearch} />}>
          <Route
            index
            element={
              <HomePage data={data} isLoading={isLoading} error={error} />
            }
            errorElement={<p>There was a error</p>}
          />
          <Route path="post/:id" element={<PostDetail />} />
          <Route
            errorElement={<p>There was a error</p>}
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
