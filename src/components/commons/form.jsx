import React, { Component } from "react";
import Joi from "joi-browser";
import _ from "lodash";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = { data: {}, errors: {} };

  formSchema = {};

  validate() {
    const { data } = { ...this.state };
    const errors = {};
    const { error } = this.schema.validate(data);

    if (!error) return null;

    for (let err of error.details) {
      errors[err.path[0]] = err.message;
    }
    return errors;
  }

  validateField = ({ name, value }) => {
    const errors = { ...this.state.errors };
    const input = { [name]: value };
    const schema = { [name]: this.formSchema[name] };
    const rule = Joi.object(schema);

    const { error } = rule.validate(input);
    if (!error) return null;

    for (let err of error.details) {
      errors[err.path[0]] = err.message;
    }

    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    const errors = this.validateField(input);
    this.setState({ data, errors: errors || {} });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    if (!_.isEmpty(errors)) {
      this.setState({ errors });
      return;
    }

    this.doSubmit();
  };

  renderSubmit(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, placeholder = "", type = "text") {
    return (
      <Input
        label={label}
        name={name}
        value={this.state.data[name]}
        type={type}
        onChange={this.handleChange}
        placeholder={placeholder}
        errorMessage={this.state.errors[name]}
      />
    );
  }

  renderSelect = (name, label, options) => {
    const {data, errors} = this.state;

    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        options={options}
        errorMessage={errors[name]}
      />
    );
  };
}

export default Form;
