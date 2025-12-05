import React, { useState, useEffect } from "react";
import "./DynamicSearchbar.css";

const API_URL = "https://api.datamuse.com/sug?s=";

function DynamicSearchbar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (word) => {
    setQuery(word);
    setSuggestions([]);
  };

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      fetch(API_URL + encodeURIComponent(query))
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data);
          setLoading(false);
        })
        .catch(() => {
          setError("⚠ Unable to fetch suggestions");
          setLoading(false);
        });
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="searchbar-container">


      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type at least 2 characters..."
        className="search-input"
      />

      {loading && <p className="helper-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li
              key={item.word}
              onClick={() => handleSuggestionClick(item.word)}
              className="suggestion-item"
            >
              {item.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DynamicSearchbar;
