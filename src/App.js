import "./App.css";
import MainPage from "./containers/MainPage";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import NotFound from "./components/NotFound";


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
        ? `https://www.reddit.com/search.json?q=${encodeURIComponent(
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
        setIsLoading(false);
        setError("There was an issue fetching the posts. Please try again later.")
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
    setSearchTerm(term);
    setTriggerSearch(true);
    setIsLoading(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout onSearch={handleSearch} />}>
          <Route
            index
            element={<MainPage data={data} isLoading={isLoading} error={error}/>}
            errorElement={<p>There was a error</p>}
          />
          <Route path="post/:id" element={<Post />} />
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
