import React, { Component, Fragment } from "react";
import marked from "marked";
import { getBlog, adminDeleteBlog } from "../../actions/BlogActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/auth";

class AdminBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getBlog();
  }

  dateFormatter(date) {
    const dateTimeArray = date.split(":");
    const dateArray = dateTimeArray[0].split("T")[0];
    return dateArray;
  }

  getMarkdownText(blog) {
    var rawMarkup = marked(`${blog}`);
    return { __html: rawMarkup };
  }

  render() {
    const { posts } = this.props;

    const blogs = posts.map((post) => {
      return (
        <div key={post.id} className="card mb-4">
          <img className="card-img-top" src={post.image} alt="Card image cap" />
          <div className="card-body">
            <div dangerouslySetInnerHTML={this.getMarkdownText(post.blog)} />
            <button
              className="btn btn-danger"
              onClick={this.props.adminDeleteBlog.bind(this, post.id)}
            >
              Delete
            </button>
          </div>
          <div className="card-footer text-muted">
            Posted on {this.dateFormatter(post.date)} by {post.creator}
          </div>
        </div>
      );
    });

    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              Katwe colab
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    <button
                      className="btn btn-danger"
                      onClick={this.props.logoutUser}
                    >
                      Logout
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* <!-- Page Content --> */}
        <div className="container">
          <div className="row">
            {/* <!-- Blog Entries Column --> */}
            <div className="col-md-8">
              <h1 className="my-4">Welcome to Admin Dash board</h1>

              <div>{blogs}</div>
            </div>

            {/* <!-- Sidebar Widgets Column --> */}
            <div className="col-md-4">
              {/* <!-- Search Widget --> */}
              <div className="card my-4">
                <h5 className="card-header">Search</h5>
                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by blogger..."
                    />
                    <span className="input-group-append">
                      <button className="btn btn-secondary" type="button">
                        Go!
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Side Widget --> */}
              <div className="card my-4">
                <h5 className="card-header">Quote of the day</h5>
                <div className="card-body">
                  A house divided against it's self cannot stand
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.BlogReducer.blogPosts,
});

export default connect(mapStateToProps, {
  getBlog,
  adminDeleteBlog,
  logoutUser,
})(AdminBoard);
