import React from 'react';
import './css/single-listing.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import { Container, Row, Col } from 'react-grid-system';
import SimpleReactCalendar from 'simple-react-calendar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
	listing: {
		availableDate: {
			DateSpan: [{
				startDate: undefined, 
				endDate: undefined
			}]
		}
	},
	newEnd: undefined
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
			var date = new Date(this.state.listing.availableDate.DateSpan[0].endDate);
			date.setDate(date.getDate()+2);
			this.setState({newEnd: date});
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
            <Slideshow images={['https://amp.businessinsider.com/images/5bb256ca9a4ab803db619ada-750-544.jpg','https://s3.amazonaws.com/images.rvs.com/images/popular-brands/2018-thor_freedom_elite.jpg','https://cdn2.rvtrader.com/v1/media/5dd256bc2f0d6941c929e897.jpg?width=1024&height=768&quality=70']} className="photos"/>
          </div>
          
          <div className="dates">
		    <SimpleReactCalendar disabledIntervals={[{start: new Date(2015,0,1), end: this.state.listing.availableDate.DateSpan[0].startDate ? this.state.listing.availableDate.DateSpan[0].startDate : new Date(2015,0,1)}, {start: this.state.newEnd ? this.state.newEnd : new Date(2025,0,1), end: new Date (2025,0,1)}]}/>
            <button className="book-btn" onClick={this.handleSubmit}>Book Now</button>
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
					<p>{this.state.listing.city}</p>
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
