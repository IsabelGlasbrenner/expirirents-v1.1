import React from "react";
import "./css/login-or-signup.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-grid-system';
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { MdPersonOutline } from "react-icons/md";
import { TiGroupOutline } from "react-icons/ti";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import UserService from "./services/user-service"


const initialState = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	email: "",
	password: ""
};

 
class LoginOrSignup extends React.Component {
	constructor(props) {

		super(props);
		this.state = initialState;
		//this.service = new UserService();
		console.log("hello this is log");
	}

	handleChange = async event => {
		console.log("handle change called /n");
		const { name, value } = event.target;
		await this.setState({ [name]: value });
	};

	handleLogin = async event => {
		event.preventDefault();

		if (this.state.email === "" || this.state.password === "")
			alert("Enter Login Credentials");
		fetch("http://18.224.3.21/user/login", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log("Login name: " + data.email);
				console.log(this.props);
				this.props.history.push("/profile-page", { name: data.firstname, 
												email: data.email });
			})

			//.then(this.service.setLoggedIn(true));
	}

	handleRegister = async event => {
		event.preventDefault();
		console.log("State: " + this.state.firstName + ", " + this.state.email);
		if (this.state.firstName === "" || this.state.lastName === "" || this.state.phoneNumber === "" || this.state.email === "" || this.state.password === "")
			alert("Enter Register Credentials");
		else {
			fetch("http://18.224.3.21/user/register", {
				method: "post",
				headers: {

					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					firstname: this.state.firstName,
					lastname: this.state.lastName,
					phone_number: this.state.phoneNumber,
					email: this.state.email,
					password: this.state.password
				})
			})
				.then(res => res.json())
				.then(data => {
					// Passes in email for population purposes

					//this.service.setEmail(data.email);
					localStorage.setItem('email', data.email);
					console.log("this is the email stored in localstorage: ", + localStorage.getItem('email'));

					console.log("this is the data: " + data);
					console.log(this.props);
					this.props.history.push("/", { name: data });
				})
				.catch(err => { console.log(err); })
		}

		// Finally!
		//this.service.setLoggedIn(true);
	}

	render() {
		return (
			<div className="parent">
				<Header />
				<div className="body">
					<Row className="login-or-signup">
						<p className="heading"> Login or Signup to get access to your personal profile and the ability to post your ATV's.</p>
						<Col className="half-page-1">
							<Form onSubmit={this.handleLogin} className="form-1">
								<Form.Group>
									<Col>
										<p className="form-title-1">Welcome Back</p>
										<p className="form-title-2">Login</p>
									</Col>
									<Col>
										<Form.Label className="field-label">Email Address    <AiOutlineMail /></Form.Label>
									</Col>
									<Col className="email-or-password">
										<Form.Control
											type="email"
											name="email"
											onChange={this.handleChange}
											className="input-field"
											required
										/>
									</Col>
									<Col>
										<Form.Label className="field-label">Password    <FiLock /></Form.Label>
									</Col>
									<Col className="email-or-password">
										<Form.Control
											type="Password"
											name="password"
											onChange={this.handleChange}
											className="input-field"
											required
										/>
									</Col>
									<Col>
										<Button className="password-submit" onClick={this.handleLogin}>
											Submit
										</Button>
									</Col>
								</Form.Group>
							</Form>
						</Col>
						<Col className="half-page-2">
							<Form onSubmit={this.handleRegister} className="form-2">
								<Form.Group>
									<Col>
										<p className="form-title-1">Dont have an account?</p>
										<p className="form-title-2">Signup</p>
									</Col>
									<Col>
										<Row>
											<Form.Label className="name-field-label-1">First Name   <MdPersonOutline /></Form.Label>
											<Form.Label className="name-field-label-2">Last Name    <TiGroupOutline /></Form.Label>
										</Row>
									</Col>
									<Col>
										<Row>
											<Form.Control
												type="input"
												name="firstName"
												onChange={this.handleChange}
												className="name-field-1"
												required
											/>
											<Form.Control
												type="input"
												name="lastName"
												onChange={this.handleChange}
												className="name-field-2"
												required
											/>
										</Row>
									</Col>
									<Col>
										<Form.Label className="field-label">Email Address    <AiOutlineMail /></Form.Label>
									</Col>
									<Col className="email-or-password">
										<Form.Control
											type="input"
											name="email"
											onChange={this.handleChange}
											className="input-field"
											required
										/>
									</Col>
									<Col>
										<Form.Label className="field-label">Password    <FiLock /></Form.Label>
									</Col>
									<Col className="email-or-password">
										<Form.Control
											type="Password"
											name="password"
											onChange={this.handleChange}
											className="input-field"
											required
										/>
									</Col>
									<Col>
										<Form.Label className="field-label">Phone Number    <FiLock /></Form.Label>
									</Col>
									<Col className="email-or-password">
										<Form.Control
											type="input"
											name="phoneNumber"
											onChange={this.handleChange}
											className="input-field"
											required
										/>
									</Col>
									<Col>
										<Button className="password-submit" onClick={this.handleRegister}>
											Submit
										</Button>
									</Col>
								</Form.Group>
							</Form>
						</Col>
					</Row>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withRouter(LoginOrSignup);
