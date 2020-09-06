import React, { Component } from "react";
// import "../style/formStyle.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  }

  render() {
    if (this.props.isAuthenticated) {
      //document.documentElement.style.setProperty("--topMargin", "120px");

      if (this.props.user.username === "superuser") {
        return <Redirect to="/adminBoard" />;
      } else if (this.props.user.username !== "superuser") {
        return <Redirect to="/blogForm" />;
      }
    }
    // }else{
    //   document.documentElement.style.setProperty("--topMargin", "20px");
    // }

    const { username, password } = this.state;
    return (
      <div className="form-div">
        <form onSubmit={this.onSubmit} className="Loginform">
          <h1>Login Form</h1>
          <div className="formcontainer">
            <hr />
            <div className="container">
              <label>
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                className="AcountInput"
                onChange={this.onChange}
                required
              />
              <label>
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                className="AcountInput"
                onChange={this.onChange}
                required
              />
            </div>
            <button className="AccountBtn" type="submit">
              Login
            </button>
            <div className="have-Acco" style={{ backgroundColor: "#eee" }}>
              <div className="psw">
                <span>
                  <Link to="/register">Don't have an Account?</Link>
                  <Link to="/">Back to blog posts</Link>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { login })(LoginForm);
