import React, { Component } from "react";
import Like from "./commons/like";
import TableHeader from "./commons/tableHeader";
import TableBody from "./commons/tableBody";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like isLiked={movie.isLiked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movieList, sortColumn, onLike, onDelete, onSort } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={(column) => onSort(column)}
        />
        <TableBody
          data={movieList}
          columns={this.columns}
          onLike={(movie) => onLike(movie)}
          onDelete={(movieId) => onDelete(movieId)}
        />
      </table>
    );
  }
}

export default MovieTable;
