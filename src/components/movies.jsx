import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./commons/like";

class Movie extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete(id) {
    const movies = this.state.movies.filter((movie) => movie._id != id);
    this.setState({ movies });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movie};
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  }

  renderMovieList(movies) {
    return movies.map((movie) => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Like isLiked={movie.isLiked} onClick={() => this.handleLike(movie)} />
          </td>
          <td>
            <button
              onClick={() => {
                this.handleDelete(movie._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  showMovieList() {
    return (
      <>
        <p>Showing {this.state.movies.length} movies in the datebase.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderMovieList(this.state.movies)}</tbody>
        </table>
      </>
    );
  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There is no movies in database!</p>;

    if (count > 0) return this.showMovieList();
  }
}

export default Movie;
