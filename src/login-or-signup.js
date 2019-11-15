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

const initialState = {
	email: "",
	password: ""
};

class LoginOrSignup extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
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
				if (data.id) {
					this.props.history.push("/", { email: this.state.email });
				} else {
					alert("Email and password do not match. Please try again!");
				}
			});
	};

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
							<Form onSubmit={this.handleLogin} className="form-2">
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
												type="email"
												name="email"
												onChange={this.handleChange}
												className="name-field-1"
												required
											/>
											<Form.Control
												type="email"
												name="email"
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
										<Form.Label className="field-label">Confirm Password    <FiLock /></Form.Label>
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
					</Row>
					<Footer />
				</div>
			</div>
		);
	}
}

export default LoginOrSignup;
