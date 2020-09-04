import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import BlogForm from "../components/layouts/BlogForm";
import BlogPost from "../components/layouts/BlogPosts";

import store from "../store";

import PrivateRoute from "../PrivateRoutes/Private";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <BlogForm />
            {/* <BlogPost /> */}
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));

export default App;
