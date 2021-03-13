import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";
import "../CSS/Common.css";

class Signup extends Component {
  state = { username: "", password: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .signup(username, password)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(response);
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="main">
          <p className="sign">Create your account:</p>
          <form className="form1" onSubmit={this.handleFormSubmit}>
            <label className="sign">Username:</label>
            <input
              type="text"
              className="un"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />

            <label className="sign">Password:</label>
            <input
              className="pass"
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />

            <button className="submit" type="submit" value="Signup">
              Signup
            </button>
          </form>

          <h5>
            Already have an account?
            <Link to={"/login"}> Login</Link>
          </h5>
        </div>
      </div>
    );
  }
}

export default Signup;
