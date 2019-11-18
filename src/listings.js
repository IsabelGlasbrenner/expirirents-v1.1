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
	data: [],
	fData: [],
	location: "",
	to: "",
	from: "",
	type: ""
}

class Listings extends React.Component {
	optType = ["", "ATV", "RV", "Boat"];

	constructor(props) {
		super(props);
		this.state = initialState;
	}
	
	componentDidMount() {
		this.setState({location: this.props.location.state.location});
		this.setState({to: this.props.location.state.to});
		this.setState({from: this.props.location.state.from});
		this.setState({type: this.props.location.state.type});
		
		fetch("http://18.224.3.21/user/showListing", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			this.setState({data: data});
			this.setState({fData: data});
		})
		console.log(this.state);
	}

	handleChange = val => (event) => {   
		if(val === 'f1') {
			this.setState({fData: this.filterData(this.state.data, event.target.value)})
		} else if (val === 'f2') {

		} else {

		}
	}

	filterData(data, filtVal) {
		var filtData = data;
		filtData = filtData.filter(function (filtData) {
			if(filtVal === "") {
			  return true;
			}
			return filtData.vehicleType === filtVal;
		})
		console.log(this.state);
		return filtData;
	}

	printState() {
		console.log(this.state);
	}
	render() {
		{this.printState()}
		return (
			<div className="parent">
				<Header />
				<div className="page">
					<div className="filters">
					<select className="form-control" defaultValue={this.state.type} onChange={this.handleChange("f1")}>
						<option value="">Type...</option>
						<option value="off roader">off roader</option>
						<option value="RV">RV</option>
						<option value="Boat">Boat</option>
					</select>
					<Dropdown options={this.optType} value={this.optType[0]} onChange={this.handleChange(2)} />
					<Dropdown options={this.optType} value={this.optType[0]} onChange={this.handleChange(3)} />
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
									<Container fluid style={{ lineHeight: '3px' }} className="container">
										<Row justify="start">
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
									</Container>
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
