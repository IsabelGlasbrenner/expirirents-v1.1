import React from 'react';
import './css/add-listings.css';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-grid-system';
import { AiOutlineMail } from "react-icons/ai";
import Button from 'react-bootstrap/Button';
import { FaCamera} from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { GiCarWheel } from "react-icons/gi";
import { withRouter } from 'react-router-dom';


const initialState = {
	image1: "",
	image2: "",
	image3: "",
	image4: "",
	listingID: ""
}

class AddImages extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}
	
	addImages = async event => {
		await this.setState({listingID: this.props.location.state.listID });
		event.preventDefault();

		if (this.state.images1 === "" || this.state.images2 === "") 
			alert("Please add at least two images");
		else {
			for(var i = 0; i < 4; i++) {
				if (i == 0 && this.state.image1 != "") this.postImage(this.state.image1);
				if (i == 1 && this.state.image2 != "") this.postImage(this.state.image2);
				if (i == 2 && this.state.image3 != "") this.postImage(this.state.image3);
				if (i == 3 && this.state.image4 != "") this.postImage(this.state.image4);
			}
			this.props.history.push("/listings", {location: "", to: undefined, from: undefined, type: ""});
		}
	}

	postImage(image) {
		console.log("SENDING: " + this.state.listingID);
		console.log("SENDING: " + image);
		fetch("http://18.224.3.21/user/listingImage", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify({
				listingID: this.state.listingID,
				filepath: image
			})
		})
			.then(res => res.json())
			.then(data => {
			})
			.catch(err => console.log(err));
	}

	handleChange = async event => {
		console.log("handle change called /n");
		const { name, value } = event.target;
		await this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="parent">
				<Header />
				<Col>
					<Form onSubmit={this.addImages}>
						<p className="form-title">Please add 2 or more images to your listing! Input the URLs of your hosted images</p>
						<Form.Group className="formgroup2">
							<Col className="field-1">
								<Row>
									<Form.Label className="field-labels">Image 1  <FaCamera /></Form.Label>
								</Row>
								<Form.Control
									type="image1"
									name="image1"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Image 2  <FaCamera /></Form.Label>
								</Row>
								<Form.Control
									type="image2"
									name="image2"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Image 3   <FaCamera /></Form.Label>
								</Row>
								<Form.Control
									type="image3"
									name="image3"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Row>
									<Form.Label className="field-labels">Image 4   <FaCamera /></Form.Label>
								</Row>
								<Form.Control
									type="image4"
									name="image4"
									onChange={this.handleChange}
									className="input-fields"
									required
								/>
							</Col>
							<Col className="field">
								<Button id="button" className="form-submit" onClick={this.addImages}>
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

export default withRouter(AddImages);
