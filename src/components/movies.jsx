import React, { Component } from "react";
import Pagination from "./commons/pagination";
import { paginate } from "./../utils/paginate";
import MovieTable from "./movieTable";

class Movies extends Component {
  render() {
    const { movies, pageSize, currentPage, sortColumn, onLike, onDelete, onSort, onPagination } = this.props;
    const { length: count } = movies;

    if (count === 0) return <p>There is no movies in database!</p>;

    if (count > 0) {
      let movieList = paginate(movies, currentPage, pageSize);

      return (
        <>
          <p>Showing {count} movies in the datebase.</p>
          <MovieTable
            sortColumn={sortColumn}
            movieList={movieList}
            onLike={(movie) => onLike(movie)}
            onDelete={(movieId) => onDelete(movieId)}
            onSort={(column) => onSort(column)}
          />
          <Pagination
            total={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onClick={(page) => onPagination(page)}
          />
        </>
      );
    }
  }
}

export default Movies;
