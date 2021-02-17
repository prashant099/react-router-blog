import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { createPost } from "../actions";

class PostNew extends Component {
  componentDidMount() {
    document.title = "Create Post";
  }

  renderInput = (field) => {
    const {
      meta: { touched, error },
    } = field;

    const style = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={style}>
        <label>{field.label}</label>
        <input type="text" {...field.input} className="form-control" />
        <div className="text-help">{touched && error}</div>
      </div>
    );
  };

  renderTextArea = (field) => {
    const {
      meta: { touched, error },
    } = field;

    const style = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={style}>
        <label>{field.label}</label>
        <textarea
          cols="30"
          rows="10"
          {...field.input}
          className="form-control"
        ></textarea>
        <div className="text-help">{touched && error}</div>
      </div>
    );
  };

  onFormSubmit = (formData) => {
    this.props.createPost(formData, () => this.props.history.push("/"));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h3>Create new Post</h3>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <Field name="title" label="Title" component={this.renderInput} />
          <Field
            name="categories"
            label="Categories"
            component={this.renderInput}
          />
          <Field
            name="content"
            label="Post Content"
            component={this.renderTextArea}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/" className="btn btn-danger">
            Cancel
          </Link>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "You must enter a title!";
  }

  if (!values.categories) {
    errors.categories = "Please enter categories!";
  }

  if (!values.content) {
    errors.content = "Please enter some Content!";
  }

  return errors;
};

export default reduxForm({
  validate,
  form: "PostNewForm",
})(connect(null, { createPost })(PostNew));
