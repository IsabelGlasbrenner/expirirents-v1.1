import React from "react";
import "./css/header.css";
import logo from "../images/logo.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<Link to="/"><img src={logo} className="logo" alt="expiriRents" /></Link>
			<ul>
				<Link to="/"><li>Home</li></Link>
				<Link to="/listings"><li>All Listings</li></Link>
				<Link to="/login-or-signup"><li>Login/Signup</li></Link>
			</ul>
		</header>
	);
};

export default Header;
