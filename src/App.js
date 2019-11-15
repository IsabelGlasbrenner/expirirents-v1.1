import React from "react";
import mountains from "./images/mountains.jpg";
import "./css/App.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {

  opt = ["Motorcycle", "Dirt Bike", "Mountain Bike", "ATV", "Boat"];
  state = {
    stateDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={mountains} className="Mountains" alt="Mountains" />
          <h2 className="heading">
            Check out the ATV's for rent in your area...
          </h2>
          <div className="searchBox">
            <label className="input">Location</label>
            <input type="text" className="input" />
            <label className="title">
                Location:
              </label>
              <input type="text" className="input" />
              <Dropdown options={this.opt} className="filters"/>
              <label className="title">
                From: 
              </label>
              <DatePicker
                selected={this.state.startDate}
                onSelect={this.handleSelect}
                onChange={this.handleChange}
              />
              <label className="title">
                To:
              </label>
              <DatePicker
                selected={this.state.startDate}
                onSelect={this.handleSelect}
                onChange={this.handleChange}
              />
              <input type="submit" value="Search" />
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
