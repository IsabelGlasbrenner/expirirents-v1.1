import React from "react";
import Footer from "./components/footer.js";
import Header from "./components/header.js";

import "./css/profile-page.css";
import 'react-tabs/style/react-tabs.css';

import mountains from "./images/mountains.jpg";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


class ProfilePage extends React.Component {
  render() {
    return (
      <div className="ProfilePage">
        <Header />
        <Tabs>
          <TabList>
            <Tab>View Profile</Tab>
            <Tab>Change Password</Tab>
            <Tab>Profile Listings</Tab>
          </TabList>

          <TabPanel>
            <p>
              <b>My profile</b> (<i> In progress</i>) blah
            </p>

          </TabPanel>

          <TabPanel>
            <p>
              <b>Change My Credentials</b> (<i>In progress</i>) blah
            </p>
          </TabPanel>

          <TabPanel>
            <p>
              <b>My Created Listings</b> (<i> In progress</i>) blah
            </p>
          </TabPanel>

        </Tabs>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
