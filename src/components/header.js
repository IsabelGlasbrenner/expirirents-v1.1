import React from "react";
import "./css/header.css";
import logo from "../images/logo.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<Link to="/"><img src={logo} className="expiriRents-logo" alt="expiriRents" /></Link>
				<Link to="/login-or-signup" className="header-link">Login/Signup</Link>
				<Link to="/listings" className="header-link">All Listings</Link>
				<Link to="/add-listing" className="header-link">Create Listing</Link>
			</div>
		</header>
	);
};

export default Header;
