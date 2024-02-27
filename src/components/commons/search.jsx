import React, { Component } from "react";

const Search = ({value, onSearch}) => {
  return (
    <input
      className="form-control"
      onChange={(e) => onSearch(e.currentTarget.value)}
      value={value}
      type="text"
      placeholder="Search..."
    />
  );
};

export default Search;
