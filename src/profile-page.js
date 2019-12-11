import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";
import "./css/profile-page.css";

import Footer from "./components/footer.js";
import Header from "./components/header.js";
import { Container, Row, Col } from "react-grid-system";
import Slideshow from "./components/slideshow.js";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FaTrash} from "react-icons/fa";

const initialState = {
  email: "",
  listings: []
};

let saveState = {
  email: "",
  name: ""
};

let loggedIn = false;

class ProfilePage extends React.Component {
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

    console.log("saved state email profile-----> " + saveState.email);

    loggedIn = false;

    if (saveState.email) {
      if (saveState.email != "logout") {
        loggedIn = true;
      }
    }

    if (!loggedIn && saveState.email != "logout") {
      console.log("Redirecting to login page.");
      this.props.history.push("/login-or-signup");
    }
  }

  componentDidMount() {
    fetch("http://18.224.3.21/user/profile", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email: this.state.email })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ profile: data });
        if (data.listings) {
          data.listings.id.map(dataID => {
            fetch("http://18.224.3.21/user/getListing", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
              body: JSON.stringify({ listingID: dataID })
            })
              .then(res => res.json())
              .then(data => {
                if (data.description) {
                  this.state.listings.push(data);
                  this.setState(this.state);
                }
              });
          });
        }
      });
  }

  deleteListing(dataID) {
	fetch("http://18.224.3.21/user/deleteListing", {
		method: "post",
		headers: {
		  "Content-Type": "application/json",
		  Accept: "application/json"
		},
		body: JSON.stringify({ listingID: dataID })
	  })
		.then(res => res.json())
		.then(data => {
		  if (data.description) {
			this.state.listings.push(data);
			this.setState(this.state);
		  }
		});
  }

  render() {
    return (
      <div className="profile-page">
        <Header />
        <div className="page-col">
          <h1 className="account-heading">Account</h1>
          <h2 className="account-subheader1">Welcome, {saveState.name}!</h2>
          <h3 className="account-subheader2">
            Here's the information we have saved for you.
          </h3>
          <Tabs>
            <div className="tabs">
              <TabList>
                <Tab>Profile</Tab>
                <Tab>Your Listings</Tab>
              </TabList>
              <TabPanel>
                <div className="tab-panel">
                  <h3 className="tab-header1">Profile</h3>
                  <div className="section">
                    <h4 className="section-title">Name</h4>
                    <p className="section-content">{saveState.name}</p>
                  </div>
                  <div className="section">
                    <h4 className="section-title">Email</h4>
                    <p className="section-content">{saveState.email}</p>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="tab-panel">
                  <h3 className="tab-header2">Your Listings</h3>
                  <div className="grid-container">
                    {" "}
                    {this.state.listings.map((listing, i) => {
                      return (
                        <div key={i} className="card">
						  <Slideshow images={["https://www.generalrv.com/blog/wp-content/uploads/2019/05/ClassA_Diesel-exteriorFleetwood_Discovery-1.jpg", "https://parade.com/wp-content/uploads/2019/09/rvshare-las-vegas-nv-ftr.jpeg", "https://www.tripsavvy.com/thmb/RQjFHEqHqmkgYjG0MwwWQVnbgJ4=/2142x1424/filters:no_upscale():max_bytes(150000):strip_icc()/class-a-motorhome-56a817715f9b58b7d0f08c05.jpg"]}/>
                          <Link
						    style={{ textDecoration: 'none' }}
                            to={{
                              pathname: "/single-listing",
                              state: { listID: listing._id }
                            }}
                          >
                            <Container
                              fluid
                              style={{ lineHeight: "3px" }}
                              className="container"
                            >
                              <Row justify="start">
                                <Col>
                                  <p id="type">
                                    <span>{listing.vehicleType}</span>
                                  </p>
                                </Col>
                                <Col>
                                  <p id="location">{listing.city}</p>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3>{listing.vehicleName}</h3>
                                  <h5>${listing.price}/day</h5>
                                </Col>
                              </Row>
                            </Container>
                          </Link>
							<button id="invis" onClick={this.deleteListing(listing._id)}><FaTrash/></button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabPanel>
            </div>
          </Tabs>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
