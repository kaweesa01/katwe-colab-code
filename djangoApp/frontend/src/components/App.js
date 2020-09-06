import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";

import BlogForm from "../components/layouts/BlogForm";
import BlogPost from "../components/layouts/BlogPosts";

import store from "../store";

import LoginForm from "../components/../Forms/Login";
import RegisterForm from "../components/../Forms/Register";

import PrivateRoute from "../PrivateRoutes/Private";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AdminBoard from '../components/layouts/AdminBoard'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <PrivateRoute exact path="/blogForm" component={BlogForm} />
              <PrivateRoute exact path="/adminBoard" component={AdminBoard} />
              <Route exact path="/" component={BlogPost} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));

export default App;
