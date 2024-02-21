import React, { Component } from "react";
import Like from "./commons/like";

class MovieTable extends Component {
  state = {
    sortColumn: {path: 'title', order: 'asc'}
  }

  raiseSort = path => {
    const sortColumn = {...this.props.sortColumn};
    if(sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc': 'asc'
    } else {
      sortColumn.path = path;
      sortColumn.order = 'asc'
    }

    this.props.onSort(sortColumn);
  }


  render() {
    const { movieList, onLike, onDelete } = this.props;
    return (
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort('title')}>Title</th>
            <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
            <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
            <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie) => {
            return (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like isLiked={movie.isLiked} onClick={() => onLike(movie)} />
                </td>
                <td>
                  <button
                    onClick={() => {
                      onDelete(movie._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MovieTable;