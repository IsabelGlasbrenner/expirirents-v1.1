import React from "react";
import "./css/add-listings.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-grid-system";
import { AiOutlineMail } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import {
  FaTools,
  FaFileInvoiceDollar,
  FaMapPin,
  FaTruckMonster,
  FaCarSide,
  FaInfo,
  FaRegCalendarPlus
} from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { GiCarWheel } from "react-icons/gi";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
  email: "",
  vehiclename: "",
  description: "",
  owner: "",
  numWheels: "",
  location: "USA",
  age: null,
  price: "",
  pickup: false,
  rating: 5,
  vehicletype: "",
  startDate: "",
  endDate: "",
  city: "",
  state: ""
};

let saveState = {
  email: "",
  name: ""
};

let loggedIn = false;

class AddListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = initialState;
    if (props.history.location.state) {
      this.name = props.history.location.state.name;
      this.email = props.history.location.state.email;
    }

    this.state.email = this.email;

    if (this.email) {
      saveState.email = this.email;
      saveState.name = this.name;
    }

    console.log("saved state email add-----> " + saveState.email);

    loggedIn = false;

    if (saveState.email) {
      if (saveState.email != "logout") {
        loggedIn = true;
      }
    }
  }

  addListing = async event => {
    console.log(
      "Add listing: ---->" +
        this.state.description +
        "-->" +
        this.state.startDate
    );
    event.preventDefault();

		if (this.state.email === "" ||
			this.state.vehiclename === "" ||
			this.state.description === "" ||
			this.state.owner === "" ||
			this.state.numWheels === "" ||
			this.state.age === null ||
			this.state.price === "" ||
			this.state.rating === null ||
			this.state.vehicletype === "" ||
			this.state.startDate === "" ||
			this.state.endDate === "" ||
			this.state.city === "" ||
			this.state.state === ""
		)
			alert("Enter all of the required data");
		else {
			fetch("http://18.224.3.21/user/addListing", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					email: saveState.email,
					vehiclename: this.state.vehiclename,
					description: this.state.description,
					owner: this.state.owner,
					numWheels: this.state.numWheels,
					age: this.state.age,
					price: this.state.price,
					rating: this.state.rating,
					pickup: this.state.pickup,
					vehicletype: this.state.vehicletype,
					availabledate: [this.state.startDate, this.state.endDate],
					city: this.state.city,
					state: this.state.state,
				})
			})
				.then(res => res.json())
				.then(data => {
					console.log("Returned Data: " + data._id);
					this.props.history.push("/add-images", {listID: data._id});
				})
				.catch(err => console.log(err));
		}
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
        {loggedIn ? (
          <Col>
            <Form onSubmit={this.addListing}>
              <p className="form-title">
                Fill out the form to add your vehicle.
              </p>
              <Form.Group className="formgroup">
                <Col className="field-1">
                  <Row>
                    <Form.Label className="field-labels">
                      Vehicle Name <FaTruckMonster />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="vehiclename"
                    name="vehiclename"
                    onChange={this.handleChange}
                    className="input-fields"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Your Name <IoMdPerson />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="owner"
                    name="owner"
                    onChange={this.handleChange}
                    className="input-fields"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Number of Wheels <GiCarWheel />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="numWheels"
                    name="numWheels"
                    onChange={this.handleChange}
                    className="input-fields"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Type of Vehicle <FaCarSide />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="vehicletype"
                    name="vehicletype"
                    onChange={this.handleChange}
                    className="input-fields"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      More Information <FaInfo />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="description"
                    name="description"
                    onChange={this.handleChange}
                    className="more-information"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Available Dates <FaRegCalendarPlus />
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label className="field-sub-label1">
                      Start Date
                    </Form.Label>
                    <Form.Label className="field-sub-label2">
                      End Date
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Control
                      type="startDate"
                      name="startDate"
                      onChange={this.handleChange}
                      className="input-sub-field1"
                      required
                    />
                    <Form.Control
                      type="endDate"
                      name="endDate"
                      onChange={this.handleChange}
                      className="input-sub-field2"
                      required
                    />
                  </Row>
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Location <FaMapPin />
                    </Form.Label>
                  </Row>
                  <Row>
                    <Form.Label className="field-sub-label1">City</Form.Label>
                    <Form.Label className="field-sub-label3">State</Form.Label>
                  </Row>
                  <Row>
                    <Form.Control
                      type="city"
                      name="city"
                      onChange={this.handleChange}
                      className="input-sub-field1"
                      required
                    />
                    <Form.Control
                      type="state"
                      name="state"
                      onChange={this.handleChange}
                      className="input-sub-field2"
                      required
                    />
                  </Row>
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Price <FaFileInvoiceDollar />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="price"
                    name="price"
                    onChange={this.handleChange}
                    className="small"
                    required
                  />
                </Col>
                <Col className="field">
                  <Row>
                    <Form.Label className="field-labels">
                      Production Year <FaTools />
                    </Form.Label>
                  </Row>
                  <Form.Control
                    type="age"
                    name="age"
                    onChange={this.handleChange}
                    className="small"
                    required
                  />
                </Col>
                <Col className="field">
                  <Button id="button" className="form-submit" onClick={this.addListing}>
                    Submit
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Col>
        ) : (
          <div className="notLoggedIn">
            <p className="notLoggedInMessage">Login to add a listing.</p>
            <Link to="/login-or-signup">
              <Button id="button" className="form-submit">Login or Signup</Button>
            </Link>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default withRouter(AddListing);
