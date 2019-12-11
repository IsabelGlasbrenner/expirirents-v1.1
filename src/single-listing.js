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
	newEnd: undefined,
	price: {}
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
		const { listID } = this.props.location.state;
		const price = this.state.listing.price;
		this.props.history.push("/checkout", {listing: listID, price: price});

	}

  render() {
    return (
      <div className="parent">
        <Header />
        <Row className="top-row">
          <div className="slides">
		  	<Slideshow images={["https://www.generalrv.com/blog/wp-content/uploads/2019/05/ClassA_Diesel-exteriorFleetwood_Discovery-1.jpg", "https://parade.com/wp-content/uploads/2019/09/rvshare-las-vegas-nv-ftr.jpeg", "https://www.tripsavvy.com/thmb/RQjFHEqHqmkgYjG0MwwWQVnbgJ4=/2142x1424/filters:no_upscale():max_bytes(150000):strip_icc()/class-a-motorhome-56a817715f9b58b7d0f08c05.jpg"]}/>
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
