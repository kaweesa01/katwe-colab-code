import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlog, getUserBlog } from "../../actions/BlogActions";
import marked from "marked";
import { Link } from "react-router-dom";
import { loadUser } from "../../actions/auth";

class BlogPost extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getBlog();
    this.props.loadUser();
    this.props.getUserBlog();
  }

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  render() {
    const { posts } = this.props;

    const postCard = posts.map((post) => {
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
        </div>
      );
    });

    return (
      <div>
        <div>
          <Link to="/blogForm">Blog with us</Link>
        </div>
        {postCard}
      </div>
    );
  }
}

const mapSateToProps = (state) => ({
  posts: state.BlogReducer.blogPosts,
});

export default connect(mapSateToProps, { getBlog, loadUser,getUserBlog })(BlogPost);
