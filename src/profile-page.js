import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import "./css/profile-page.css";

import Footer from "./components/footer.js";
import Header from "./components/header.js";
import { Container, Row, Col } from 'react-grid-system';
import Slideshow from './components/slideshow.js';
import { Link } from "react-router-dom";

const initialState = {
	email: "",
	listings: []
}


class ProfilePage extends React.Component {


	constructor(props) {
		super(props);
		this.state = initialState;
		if (props.history.location.state) {
			this.name = props.history.location.state.name;
			this.email = props.history.location.state.email;
		}

		this.state.email = this.email;
		console.log("----->" + this.name);
	}

	componentDidMount() {
		fetch("http://18.224.3.21/user/profile", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({ email: this.state.email })

		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				this.setState({ profile: data });
				if (data.listings) {
					data.listings.id.map((dataID) => {
						console.log(dataID + "--->ID");
						fetch("http://18.224.3.21/user/getListing", {
							method: "post",
							headers: {
								"Content-Type": "application/json",
								"Accept": "application/json"
							},
							body: JSON.stringify({ listingID: dataID })
						})
							.then(res => res.json())
							.then(data => {
								if (data.description) {
									console.log(data);
									this.state.listings.push(data);
									this.setState(this.state);
								}
							})
					});
				}
			})
	}


	render() {
		return (
			<div className="profile-page">
				<Header />
				<div className="page-col">
					<h1 className="account-heading">Account</h1>
					<h2 className="account-subheader1">Welcome, {this.name}!</h2>
					<h3 className="account-subheader2">Here's the information we have saved for you.</h3>
					<Tabs>
						<div className="tabs">
							<TabList>
								<Tab>Profile</Tab>
								<Tab>Your Listings</Tab>
							</TabList>
							<TabPanel>
								<div className="tab-panel">
									<h3 className="tab-header1">Profile</h3>
									<div className="section">
										<h4 className="section-title">Name</h4>
										<p className="section-content">{this.name}</p>
									</div>
									<div className="section">
										<h4 className="section-title">Email</h4>
										<p className="section-content">{this.email}</p>
									</div>
								</div>
							</TabPanel>
							<TabPanel>
								<div className="tab-panel">
									<h3 className="tab-header2">Your Listings</h3>
									<div className="grid-container"> {
										this.state.listings.map((listing, i) => {
											return (
												<div key={i} className="card">
													<Slideshow />
													<Link to={{ pathname: '/single-listing', state: { listID: listing._id } }}>
														<Container fluid style={{ lineHeight: '3px' }} className="container">
															<Row justify="start">
																<Col>
																	<p id="type"><span>{listing.vehicleType}</span></p>
																</Col>
																<Col>
																	<p id="location">{listing.location}</p>
																</Col>
															</Row>
															<Row>
																<Col>
																	<h3>{listing.vehicleName}</h3>
																	<h5>${listing.price}/day</h5>
																</Col>
															</Row>
														</Container>
													</Link>
												</div>
											);

										})
									}</div>
								</div>
							</TabPanel>
						</div>
					</Tabs>
				</div>
				<Footer />
			</div>
		);
	}
}

export default withRouter(ProfilePage);
