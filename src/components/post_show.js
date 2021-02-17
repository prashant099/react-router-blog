import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchPost, deletePost } from "../actions";

class PostShow extends Component {
  componentDidMount() {
    document.title = `Post - ${this.props.match.params.id}`;
    if (!this.props.post) {
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  onDeleteClick = () => {
    this.props.deletePost(this.props.match.params.id, () =>
      this.props.history.push("/")
    );
  };

  render() {
    if (!this.props.post) {
      return <div>Loading...</div>;
    }

    const {
      post: { title, categories, content },
    } = this.props;

    return (
      <div>
        <Link to="/">Go Back</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{title}</h3>
        <h6>Categories: {categories}</h6>
        <p>{content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
