import React, { Component } from "React";
import "../style/formStyle.css";
import { Link, Redirect } from "react-router-dom";
import { createMessage, register } from "../actions/auth";
import { connect } from "react-redux";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();
    const { username, email, password, password2 } = this.state;

    if (password !== password2) {
      const err = {
        pass: ["Passwords must mutch"],
      };
      this.props.createMessage(err);
    } else {
      const user = {
        username,
        email,
        password,
      };
      console.log(user);
      this.props.register(user);
    }
  }

  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  render() {
    if (this.props.isAuthenticated) {
      document.documentElement.style.setProperty("--topMargin", "120px");
      return <Redirect to="/" />;
    } else {
      document.documentElement.style.setProperty("--topMargin", "20px");
    }

    const { username, password1, email, password2 } = this.state;
    return (
      <div className="form-div">
        <form onSubmit={this.onSubmit} className="RegisterForm">
          <h1>SIGN UP</h1>
          <div className="icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="formcontainer">
            <div className="container">
              <label>
                <strong>Username</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                className="AcountInput"
                onChange={this.onChange}
                name="username"
                required
              />
              <label>
                <strong>E-mail</strong>
              </label>
              <input
                type="text"
                placeholder="Enter E-mail"
                name="email"
                value={email}
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
                value={password1}
                className="AcountInput"
                onChange={this.onChange}
                required
              />
              <label>
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                className="AcountInput"
                onChange={this.onChange}
                required
              />
            </div>
            <button className="AccountBtn" type="submit">
              <strong>SIGN UP</strong>
            </button>
            <div className="container" style={{ backgroundColor: "#eee" }}>
              <div className="psw">
                <span>
                  <Link to="/login">Already have an account.</Link>
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
});

export default connect(mapStateToProps, { createMessage, register })(
  RegisterForm
);
