import React from "react";
import Form from "./commons/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  formSchema = {
    username: Joi.string().required().email(),
    password: Joi.string().required().min(5),
    name: Joi.string().required()
  }

  schema = Joi.object(this.formSchema).options({ abortEarly: false });

  doSubmit() {
    console.log('register!!');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register Form</h1>
        {this.renderInput("username", "Username", "Enter Username")}
        {this.renderInput("password", "Password", "Enter Password", "password")}
        {this.renderInput("name", "Name", "Enter Name")}
        {this.renderSubmit("Register")}
      </form>
    );
  }
}

export default RegisterForm;
