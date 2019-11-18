import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import 'react-tabs/style/react-tabs.css';
import "./css/profile-page.css";

import Footer from "./components/footer.js";
import Header from "./components/header.js";
import { Container, Row, Col } from 'react-grid-system';

import mountains from "./images/mountains.jpg";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const initialState = {
	profile: {}
}

class ProfilePage extends React.Component {
  constructor(props) {
		super(props);
		this.state = initialState;
  }
  
  componentDidMount() {
    const { email } = this.props.location.state;
    console.log(email);
    
		fetch("http://18.224.3.21/user/profile", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
      },
      body: JSON.stringify({email})

		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			this.setState({profile: data});
		})
	}

  render() {
    return (
      <div className="ProfilePage">
        <Header />

        <Row className="info">
        <h1><b>{this.state.profile.firstName}</b></h1>

			  </Row>
        <h2>
          (Name), (email)
        </h2>
        <Tabs>
          <TabList>
            <Tab>Profile</Tab>
            <Tab>Update Password</Tab>
            <Tab>Your Listings</Tab>
            <Tab disabled>Eh?</Tab>
          </TabList>

          <TabPanel>
            <p>
              <b>Profile</b> (<i>This page is still in progress.</i>) Once complete, this page will show a list of profile information,
              including name, location, email, phone number, and occupation (optional).
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Update Password</b> (<i>This page is still in progress.</i>) This page will provide functionality for updating password.
            </p>
            <p>
              Fields will include: Enter old password, Enter new password, Confirm new password
            </p>
            <p>
              <a href="https://www.youtube.com/watch?v=PLOPygVcaVE" target="_blank">
                Code problem
              </a>
            </p>
          </TabPanel>
          <TabPanel>
            <p>
              <b>Your Listings</b> (<i>This page is still in progress.</i>) Should show a list of listings that this account has created. 
              Past listings included as well (?)
            </p>
          </TabPanel>
        </Tabs>
        <p>

          
        </p>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
