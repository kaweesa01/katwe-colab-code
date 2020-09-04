import React, { Component, Fragment } from "react";
import marked from "marked";
import { connect } from "react-redux";
import Proptypes from "prop-types";
import {
  addBlog,
  getBlog,
  deleteBlog,
  getEditBlog,
  editBlog,
} from "../../actions/BlogActions";

class BlogForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      image: null,
      blog: "",
      imageUrl: null,
    };
    this.onChange = this.onChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  componentDidMount() {
    this.props.getBlog();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blogEdit !== this.props.blogEdit) {
      this.setState(this.props.blogEdit);
    }
  }

  onSubmit(ev) {
    ev.preventDefault();

    const { image, blog, id } = this.state;

    if (id === null) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("blog", blog);

      const noImageBlog = {
        blog: blog,
      };
      this.props.addBlog(formData);
    } else if (id !== null) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("blog", blog);

      this.props.editBlog(id, formData);
    }
  }

  handleImage(ev) {
    this.setState({
      image: ev.target.files[0],
      imageUrl: URL.createObjectURL(ev.target.files[0]),
    });
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
            <button onClick={this.props.getEditBlog.bind(this, post.id)}>
              Update
            </button>
            <button onClick={this.props.deleteBlog.bind(this, post.id)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        <div>
          <form onSubmit={this.onSubmit}>
            <textarea
              onChange={this.onChange}
              name="blog"
              value={this.state.blog}
              cols="20"
              rows="20"
            ></textarea>
            <input multiple={false} type="file" onChange={this.handleImage} />

            <button type="submit">Submit</button>
          </form>
          <div>
            Current image:
            <img width="200px" height="200px" src={this.state.imageUrl} />
          </div>
          <div
            dangerouslySetInnerHTML={this.getMarkdownText(this.state.blog)}
          />
        </div>
        <div>
          <div>
            <h1>Your blogs</h1>
          </div>
          {blogs}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.BlogReducer.blogPosts,
  blogEdit: state.BlogReducer.blogEdit,
});

export default connect(mapStateToProps, {
  addBlog,
  getBlog,
  deleteBlog,
  getEditBlog,
  editBlog,
})(BlogForm);
