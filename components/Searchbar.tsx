"use client";

import React from "react";

const Searchbar = () => {
  const handleSubmit = () => {};
  return (
    <form className="mt-12 flex flex-wrap gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
      />
      <button type="submit" className="searchbar-btn">
        Search
      </button>
    </form>
  );
};

export default Searchbar;
