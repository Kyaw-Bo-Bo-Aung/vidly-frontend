import _ from "lodash";
import React, { Component } from "react";

const ListGroup = ({ data, currentGenreId, onClick }) => {
  return (
    <ul className="list-group">
      <li
        onClick={() => onClick(null)}
        className={
          !currentGenreId ? "list-group-item active" : "list-group-item"
        }
      >
        All Genres
      </li>
      {data.map((data) => {
        return (
          <li
            key={data._id}
            onClick={() => onClick(data._id)}
            className={
              currentGenreId && currentGenreId === data._id
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {data.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGroup;
