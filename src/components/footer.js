import React from "react";
import "./css/footer.css";
import { SocialIcon } from "react-social-icons";
import { Row, Col } from 'react-grid-system';
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";


const Footer = () => {
	return (
		<footer>
			<div className="container">
				<Link to="/" className="link">Home</Link>
				<Link to={{pathname: "/listings", state: { location: "", to: undefined, from: undefined, type: "" } }} className="link">Listings</Link>		<Link to="/add-listing" className="link">New Listing</Link>
				<Link to="/login-or-signup" className="link">Login/Signup</Link>
				<Link to="/profile-page" className="link">Profile page</Link>
			</div>
			<Col>
				<div>
					<SocialIcon
						url="http://twitter.com/"
						fgColor="#FFFFFF"
						className="social-icons"
					/>
					<SocialIcon
						url="http://facebook.com/"
						fgColor="#FFFFFF"
						className="social-icons"
					/>
					<SocialIcon
						url="http://instagram.com/"
						fgColor="#FFFFFF"
						className="social-icons"
					/>
					<SocialIcon
						url="http://yelp.com/"
						fgColor="#FFFFFF"
						className="social-icons"
					/>
					<SocialIcon
						url="http://pinterest.com/"
						fgColor="#FFFFFF"
						className="social-icons"
					/>
				</div>
			</Col>
			<Col>
				<Link to="/"><img src={logo} className="logo" alt="expiriRents" /></Link>
			</Col>
			<Col>
				<p>© Copyright 2019 Expirirents - All Rights Reserved</p>
			</Col>
		</footer >
	);
};

export default Footer;
