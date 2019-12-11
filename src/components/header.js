import React from "react";
import "./css/header.css";
import logo from "../images/logo.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";

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

    if (this.email) {
      saveState.email = this.email;
      saveState.name = this.name;
    }

    loggedIn = false;

    if (saveState.email) {
      if (saveState.email != "logout") {
        loggedIn = true;
      }
    }
  }

  handleLogout = async event => {
    console.log("we are going to logout");
    saveState.email = "logout";
    saveState.name = "";
    loggedIn = false;

    this.clearLoginData();

    console.log("sent it!");
  };

  clearLoginData = async event => {
    console.log("clearing the login data");
    this.props.history.push("/login-or-signup", {
      name: saveState.name,
      email: saveState.email
    });
  };

  clearAddListingData = async event => {
    console.log("clearing the add listings data");
    this.props.history.push("/add-listing", {
      name: saveState.name,
      email: saveState.email
    });
  };

  render() {
    return (
      <header className="header">
        <div className="container">
          <Link to="/">
            <img src={logo} className="expiriRents-logo" alt="expiriRents" />
          </Link>
          {loggedIn ? (
            <div>
              <Button id="button" className="logoutButton" onClick={this.handleLogout}>
                Logout
              </Button>
              <Link to="/profile-page" className="header-link">
                Profile
              </Link>
            </div>
          ) : (
            <Link to="/login-or-signup" className="header-link">
              Login/Signup
            </Link>
          )}
          <Link
            to={{
              pathname: "/listings",
              state: { location: "", to: undefined, from: undefined, type: "" }
            }}
            className="header-link"
          >
            All Listings
          </Link>
          <Link to="/add-listing" className="header-link">
            Add Listing
          </Link>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
