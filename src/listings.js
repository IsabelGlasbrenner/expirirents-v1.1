import React from 'react';
import './css/listings.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';

const initialState = {
	fData: []
}

class Listings extends React.Component {
	opt = [ "One", "Two", "Three"];

	constructor(props) {
		super(props);
		this.state = initialState;
	}
	
	componentDidMount() {
		fetch("http://18.224.3.21/user/showListing", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.setState({fData: data});
		})
		console.log(this.state.fData);
	}
	
	render() {
		console.log(this.state.fData);	
		return (
			<div className="parent">
        <Header />
        <div className="page">
          <div className="filters">
            <Dropdown options={this.opt} className='myClassName' />
            <Dropdown options={this.opt} className='myClassName' />
            <Dropdown options={this.opt} className='myClassName' />
          </div>

          <hr/>

          <div>
            <h2>Find your next rental</h2>
            <h4>Explore hundreds of listings</h4>
          </div>
              

		<div className="grid-container"> {
			this.state.fData.map((listings, i) => {
				return (
					<div key={i} className="card">
						<Slideshow/>
						<Link to={{pathname: '/single-listing', state: {listID: listings._id}}}>
							<div className="container">
								<Row>
									<Col>
										<p id="type"><span>{listings.vehicleType}</span></p>
									</Col>
									<Col>
										<p id="location">{listings.location}</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<h3>{listings.vehicleName}</h3>
										<h5>${listings.price}/day</h5>
									</Col>
								</Row>
							</div>
						</Link>
					</div>
				);
			})
		}</div>
		
        <Footer />
      </div>
	  </div>
    );
  }
}

export default Listings;
