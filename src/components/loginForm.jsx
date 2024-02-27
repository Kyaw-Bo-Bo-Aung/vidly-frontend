import React, { Component } from "react";
import Input from "./commons/input";
import Joi from "joi-browser";
import _ from "lodash";
import Form from "./commons/form";

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };

  formSchema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  
  schema = Joi.object(this.formSchema).options({ abortEarly: false });

  doSubmit = () => {
    console.log("submitted!");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        {this.renderInput("username", "Username", "Enter Username")}
        {this.renderInput("password", "Password", "Enter Password", "password")}
        {this.renderSubmit("Login")}
      </form>
    );
  }
}

export default LoginForm;
