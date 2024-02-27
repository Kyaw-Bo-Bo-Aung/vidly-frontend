import React from 'react';
import Form from './commons/form';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Joi from 'joi-browser';
import _ from 'lodash';

class MovieDetail extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      dailyRentalRate: "",
      genreId: "",
    },
    errors: {},
    genres: [],
  }

  formSchema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(100)
      .label("Stock"),
    genreId: Joi.string().required(),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  schema = Joi.object(this.formSchema).options({
    abortEarly: false,
  });

  componentDidMount = () => {
    const genres = getGenres();
    this.setState({ genres });

    const moiveId = this.props.match.params.id;
    if(moiveId === "new") return;

    const movie = getMovie(moiveId);
    if(!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }
  }

  doSubmit() {
    saveMovie(this.state.data);
    this.props.history.push('/movies');
  }

  render() { 
    return <>
      <form onSubmit={this.handleSubmit}>
        <h1>Movie Detail</h1>
        {this.renderInput("title", "Title", "Enter title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput(
          "numberInStock",
          "Number In Stock",
          "Enter quantity",
          "number"
        )}
        {this.renderInput("dailyRentalRate", "Rate", "Enter rate")}
        {this.renderSubmit("Update")}
      </form>
    </>
  }
}
 
export default MovieDetail;