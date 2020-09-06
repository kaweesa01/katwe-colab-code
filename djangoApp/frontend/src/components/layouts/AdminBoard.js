import React, { Component } from "react";
import marked from "marked";
import { getBlog, adminDeleteBlog } from "../../actions/BlogActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {logoutUser} from '../../actions/auth'

class AdminBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getBlog();
  }

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  render() {
    const { posts } = this.props;

    const blogs = posts.map((post) => {
      return (
        <div key={post.id}>
          <div>
            <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
          </div>
          <div>
            <h2>Created by : {post.creator}</h2>
          </div>
          <div>{post.date}</div>
          <div>
            <img width="200px" height="200px" src={post.image} />
          </div>
          <button onClick={this.props.adminDeleteBlog.bind(this, post.id)}>
            Delete
          </button>
        </div>
      );
    });

    return (
      <div>
        {/* <Link to="/">See blog posts</Link> */}
        <button onClick={this.props.logoutUser}>Logout</button>
        <h1>Welcome to admin board</h1>
        {blogs}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.BlogReducer.blogPosts,
});

export default connect(mapStateToProps, { getBlog, adminDeleteBlog,logoutUser })(
  AdminBoard
);
