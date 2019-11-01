import React from 'react';
import logo from './logo.svg';
import './css/listings.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Listings extends React.Component {
  opt = [ "One", "Two", "Three"];

  render() {
    return (
      <div className="page">
        <div className="filters">
          <Dropdown options={this.opt} className='myClassName' />
          <Dropdown options={this.opt} className='myClassName' />
          <Dropdown options={this.opt} className='myClassName' />
        </div>

        <hr/>

        <div className="grid-container">
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>[TYPE]</b></h4>
              <p>[LOCATION]</p>
              <p>[COST]</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>[TYPE]</b></h4>
              <p>[LOCATION]</p>
              <p>[COST]</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>[TYPE]</b></h4>
              <p>[LOCATION]</p>
              <p>[COST]</p>
            </div>
          </div>
          
          <div className="card">
            <Slideshow/>
            <div class="container">
              <h4><b>[TYPE]</b></h4>
              <p>[LOCATION]</p>
              <p>[COST]</p>
            </div>
          </div>
          
         
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default Listings;
