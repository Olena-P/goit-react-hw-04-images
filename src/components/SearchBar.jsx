import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      return alert("Can not be empty");
    }
    onSubmit(query);
  };

  return (
    <header className="SearchBar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button className="SearchForm-button" type="submit">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
