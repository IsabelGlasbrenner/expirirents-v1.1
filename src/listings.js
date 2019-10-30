import React from 'react';
import logo from './logo.svg';
import './css/listings.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Listings extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Listings
          </p>
        </header>
      </div>
    );
  }
}

export default Listings;
