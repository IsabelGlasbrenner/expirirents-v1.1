import React from "react";
import "./css/header.css";
import logo from "../images/logo.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

let initialState = {
  email: "",
  name: ""
};

let saveState = {
  email: "",
  name: ""
};

let loggedIn = false;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    if (props.history.location.state) {
      this.name = props.history.location.state.name;
      this.email = props.history.location.state.email;
    }

    this.state.email = this.email;
    console.log("name add----->" + this.name);
    console.log("email add-----> " + this.email);

    if (!saveState.email) {
      saveState.email = this.email;
    }
    if (!saveState.name) {
      saveState.name = this.name;
    }
    console.log("saved state email add-----> " + saveState.email);

    if (saveState.email) {
      loggedIn = true;
    }
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <Link to="/">
            <img src={logo} className="expiriRents-logo" alt="expiriRents" />
          </Link>
          <Link to="/login-or-signup" className="header-link">
            Login/Signup
          </Link>
          <Link
            to={{
              pathname: "/listings",
              state: { location: "", to: undefined, from: undefined, type: "" }
            }}
            className="header-link"
          >
            All Listings
          </Link>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
