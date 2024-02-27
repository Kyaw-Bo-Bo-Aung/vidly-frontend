import React, { Component } from "react";
import _ from "lodash";
import Pagination from "./commons/pagination";
import ListGroup from "./commons/listGroup";
import { paginate } from "./../utils/paginate";
import MovieTable from "./movieTable";
import { getGenres } from "./../services/fakeGenreService";
import { getMovies } from "./../services/fakeMovieService";
import { Link } from "react-router-dom";
import Search from "./commons/search";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
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
    this.setState({ currentGenreId: genreId, currentPage: 1, searchQuery: "" });
  }

  handleSort(sortColumn) {
    this.setState({ sortColumn });
  }

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, currentPage: 1, currentGenreId: "" })
  }

  render() {
    const {
      currentGenreId,
      movies,
      genres,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    let movieList = movies;
    if(searchQuery){
      movieList = movies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }
    if (currentGenreId) {
      movieList = movies.filter((movie) => movie.genre._id === currentGenreId);
    }

    movieList = _.orderBy(movieList, [sortColumn.path], [sortColumn.order]);

    const { length: count } = movieList;
    // if (count === 0) return <p>There is no movies in database!</p>;

    if (count > 0) {
      movieList = paginate(movieList, currentPage, pageSize);
    }
      return (
        <>
          <div className="row">
            <div className="col-3">
              <ListGroup
                data={genres}
                currentGenreId={currentGenreId}
                onClick={(id) => this.handleFilterGenre(id)}
              />
            </div>
            <div className="col-9">
              <Link to="/movies/new" className="btn btn-primary mb-2">
                New Movie
              </Link>
              <p>Showing {count} movies in the datebase.</p>
              <Search value={searchQuery} onSearch={(query) => this.handleSearch(query)} />
              <MovieTable
                sortColumn={sortColumn}
                movieList={movieList}
                onLike={(movie) => this.handleLike(movie)}
                onDelete={(movieId) => this.handleDelete(movieId)}
                onSort={(column) => this.handleSort(column)}
              />
              <Pagination
                total={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onClick={(page) => this.handlePagination(page)}
              />
            </div>
          </div>
        </>
      );
  }
}

export default Movies;
