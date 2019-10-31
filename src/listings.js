import React from 'react';
import logo from './logo.svg';
import './css/listings.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Listings extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="grid-container">
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>John Doe</b></h4>
              <p>Architect and Engineer</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>John Doe</b></h4>
              <p>Architect and Engineer</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>John Doe</b></h4>
              <p>Architect and Engineer</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>John Doe</b></h4>
              <p>Architect and Engineer</p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Listings;
