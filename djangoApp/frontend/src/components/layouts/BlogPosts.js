import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlog } from "../../actions/BlogActions";
import marked from "marked";

class BlogPost extends Component {
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

    const postCard = posts.map((post) => {
      return (
        <div>
          <div>
            <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
          </div>
          <div>{post.date}</div>
          <div>
            <img width="200px" height="200px" src={post.image} />
          </div>
        </div>
      );
    });

    return (<div>
        {postCard}
        </div>);
  }
}

const mapSateToProps = (state) => ({
  posts: state.BlogReducer.blogPosts,
});

export default connect(mapSateToProps, { getBlog })(BlogPost);
