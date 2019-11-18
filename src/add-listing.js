import React from 'react';
import './css/add-listings.css';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Dropdown from 'react-dropdown';
import Form from 'react-bootstrap/Form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-grid-system';
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import { FiLock } from "react-icons/fi";



const initialState = {
	data: [],
	fData: []
}

class AddListing extends React.Component {
	optType = ["", "ATV", "RV", "Boat"];

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
				this.setState({ data: data });
				this.setState({ fData: data });
			})
	}

	handleChange = val => (event) => {
		if (val == 'f1') {
			this.setState({ fData: this.filterData(this.state.data, event.target.value) })
		} else if (val == 'f2') {

		} else {

		}
	}

	render() {
		return (
			<div className="parent">
				<Header />
				<Col>
					<Form onSubmit={this.handleLogin}>
						<p className="form-title">Fill out the form to add your vehicle.</p>
						<Form.Group className="formgroup">
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Name    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="title"
									name="title"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Type of Vehicle    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">More Information    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Available Dates    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Location    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Production Year    <AiOutlineMail /></Form.Label>
								</Row>
								<Form.Control
									type="email"
									name="email"
									onChange={this.handleChange}
									className="production-year"
									required
								/>
							</Col>
							<Col className="field">
								<Button className="form-submit" onClick={this.handleLogin}>
									Submit
							</Button>
							</Col>
						</Form.Group>
					</Form>
				</Col>
				<Footer />
			</div>
		);
	}
}

export default AddListing;
