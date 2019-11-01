import React from "react";
import "./css/login-or-signup.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LoginOrSignup extends React.Component {
  render() {
    return (
      <div className="parent">
        <Header />
        <div className="body">
          <h2 className="heading">Login or Signup to get started.</h2>
          <div className="login">
            <div className="Username">
              <label className="label">UserName:</label>
              <input type="text" className="input" />
            </div>
            <div className="Password">
              <label className="label">Password:</label>
              <input type="text" className="input" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginOrSignup;
