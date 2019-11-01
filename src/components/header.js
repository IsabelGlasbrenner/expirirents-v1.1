import React from "react";
import "./css/header.css";
import logo from "../images/logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="expiriRents" />
      <ul>
        <li>Login/Signup</li>
        <li>All Listings</li>
      </ul>
    </header>
  );
};

export default Header;
