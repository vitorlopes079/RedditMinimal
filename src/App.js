import "./App.css";
import MainPage from "./containers/MainPage";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Post";

function App() {
  const [data, setData] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "https://www.reddit.com/r/popular.json";

      if (searchTerm) {
        endpoint = `https://www.reddit.com/search.json?q=${encodeURIComponent(
          searchTerm
        )}`;
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the data: ", error);
        setIsLoading(false);
      }
    };

    if (triggerSearch) {
      fetchData();
      setTriggerSearch(false);
    }
  }, [triggerSearch]);

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
            element={<MainPage data={data} isLoading={isLoading} />}
          />
          <Route path="post/:id" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
