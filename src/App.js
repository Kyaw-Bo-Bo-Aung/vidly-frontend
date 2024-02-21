import "./App.css";
import ListGroup from "./components/commons/listGroup";
import Movies from "./components/movies";
import React, { Component } from "react";
import { getGenres } from "./services/fakeGenreService";
import { getMovies } from "./services/fakeMovieService";
import _ from "lodash";

class App extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: {path: 'title', order: 'asc'},
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDelete(id) {
    const movies = this.state.movies.filter((movie) => movie._id !== id);
    this.setState({ movies });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  }

  handlePagination(currentPage) {
    this.setState({ currentPage });
  }

  handleFilterGenre(genreId) {
    this.setState({ currentGenreId: genreId, currentPage: 1 });
  }

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }

  render() {
    let movieList = this.state.movies;
    if (this.state.currentGenreId) {
      movieList = this.state.movies.filter(
        (movie) => movie.genre._id === this.state.currentGenreId
      );
    }

    movieList = _.orderBy(movieList, [this.state.sortColumn.path], [this.state.sortColumn.order]);
    
    return (
      <main className="container mt-5">
        <div className="row">
          <div className="col-3">
            <ListGroup
              data={this.state.genres}
              currentGenreId={this.state.currentGenreId}
              onClick={(id) => this.handleFilterGenre(id)}
            />
          </div>
          <div className="col-9">
            <Movies
              sortColumn={this.state.sortColumn}
              movies={movieList}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onLike={(movie) => this.handleLike(movie)}
              onDelete={(movieId) => this.handleDelete(movieId)}
              onPagination={(page) => this.handlePagination(page)}
              onSort={(path) => this.handleSort(path)}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
