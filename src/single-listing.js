import React from 'react';
import './css/single-listing.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import BookingCalendar from 'react-booking-calendar';
import { Container, Row, Col } from 'react-grid-system';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const bookings = [
  new Date(2019, 11, 16),
  new Date(2019,11, 17),
  new Date(2016, 7, 3),
  new Date(2016, 7, 9),
  new Date(2016, 7, 10),
  new Date(2016, 7, 11),
  new Date(2016, 7, 12),
];

const initialState = {
	listing: {title: "2020 HEARTLAND PIONEER DS320", type: "RV", location: "Madison", price: "$100/Day", description: "This DS320 has plenty of room, and plenty of extras!  Heat, air, toilet, shower, front bed, dinette, couch, tv, radio, sink, stove, microwave, oven, refrigerator, lots of storage, and more.  #162306"}
}

class SingleListing extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
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
            {/* <BookingCalendar className="calendar" bookings={bookings} /> */}
            <button>Book Now</button>
          </div>
        </Row>

        <Row className="info">
			<Row className="info-fields">
				<h1><b>{this.state.listing.title}</b></h1>
			</Row>
			<Row className="info-fields">
				<Col className="col-fields">
					<h3>Type</h3>
					<p>{this.state.listing.type}</p>
				</Col>
				<Col className="col-fields">
					<h3>Location</h3>
					<p>{this.state.listing.location}</p>
				</Col>
				<Col className="col-fields">
					<h3>Price</h3>
					<p>{this.state.listing.price}</p>
				</Col>
			</Row>
			<Row className="info-fields">
				<h3>Description</h3>
				<p>{this.state.listing.description}</p>
			</Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

export default SingleListing;
