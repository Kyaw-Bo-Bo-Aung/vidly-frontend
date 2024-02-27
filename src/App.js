import "./App.css";
import Movies from "./components/movies";
import React, { Component } from "react";
import Navbar from "./components/navbar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/commons/notFound";
import MovieDetail from "./components/movieDetail";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <main className="container mt-5">
          <Switch>
            <Route path="/movies/:id" component={MovieDetail} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
