import React from "react";
import "./css/login-or-signup.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
  email: "",
  password: ""
};

class LoginOrSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = async event => {
    console.log("handle change called /n");
    const { name, value } = event.target;
    await this.setState({ [name]: value });
  };

  handleLogin = async event => {
    event.preventDefault();

    if (this.state.email === "" || this.state.password === "")
      alert("Enter Login Credentials");
    fetch("http://18.224.3.21/user/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          this.props.history.push("/", { email: this.state.email });
        } else {
          alert("Email and password do not match. Please try again!");
        }
      });
  };

  render() {
    return (
      <div className="parent">
        <Header />
        <div className="body">
          <h2 className="heading">Login or Signup to get started.</h2>

          <form className="login" onSubmit={this.handleLogin}>
            <div className="Username">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                onChange={this.handleChange}
                className="input"
              />
            </div>
            <div className="Password">
              <input
                type="Password"
                name="password"
                required
                placeholder="Password"
                onChange={this.handleChange}
                className="input"
              />
            </div>
            <div>
              <button className="password-submit" onClick={this.handleLogin}>
                Submit
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginOrSignup;
