import React from "react";
import mountains from "./images/mountains.jpg";
import "./css/App.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class ProfilePage extends React.Component {
  render() {
    return (
      <div className="ProfilePage">
        <Header />
        <header className="App-header">
          <img src={mountains} className="Mountains" alt="Mountains" />
          <h2 className="heading">
            This is the profile page!
          </h2>
        </header>
        <Footer />
      </div>
    );
  }
}

export default ProfilePage;
