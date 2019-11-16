import React from 'react';
import './css/single-listing.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
	listing: {}
}

class SingleListing extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	componentDidMount() {
		const { listID } = this.props.location.state;
		console.log(listID);

		fetch("http://18.224.3.21/user/getListing", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({listingID: listID})
		})
		.then(res => res.json())
		.then(data => {
			this.setState({listing: data});
		})
	}

	handleSubmit = async event => {
		console.log("This button doesn't have anywhere to redirect you yet. Sorry!")
	}

  render() {
    return (
      <div className="parent">
        <Header />
        <Row className="top-row">
          <div className="slides">
            <Slideshow className="photos"/>
          </div>
          
          <div className="dates">
            <button onClick={this.handleSubmit}>Book Now</button>
          </div>
        </Row>

        <Row className="info">
			<Row className="info-fields">
				<h1><b>{this.state.listing.vehicleName}</b></h1>
			</Row>
			<Row className="info-fields">
				<Col className="col-fields">
					<h3>Type</h3>
					<p>{this.state.listing.vehicleType}</p>
				</Col>
				<Col className="col-fields">
					<h3>Location</h3>
					<p>{this.state.listing.location}</p>
				</Col>
				<Col className="col-fields">
					<h3>Price</h3>
					<p>${this.state.listing.price}/day</p>
				</Col>
			</Row>
			<Row className="info-fields">
				<Col>
					<h3>Description</h3>
					<p>{this.state.listing.description}</p>
				</Col>
			</Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default SingleListing;
