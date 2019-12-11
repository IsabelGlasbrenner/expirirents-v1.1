import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./css/index.css";
import App from "./App";
import Listings from "./listings";
import SingleListing from "./single-listing";
import LoginOrSignup from "./login-or-signup";
import ProfilePage from "./profile-page";
import AddListing from "./add-listing";
import AddImages from "./add-images";
import CheckoutForm from "./checkout";
import Booking from "./booking.js"
import Header from "./components/header.js";

import * as serviceWorker from "./serviceWorker";

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/listings" component={Listings} />
			<Route path="/single-listing" component={SingleListing} />
			<Route path="/login-or-signup" component={LoginOrSignup} />
			<Route path="/profile-page" component={ProfilePage} />
			<Route path="/add-listing" component={AddListing} />
			<Route path="/add-images" component={AddImages} />
			<Route path="/header" component={Header} />
			<Route path="/checkout" component={Booking} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
