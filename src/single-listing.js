import React from 'react';
import './css/single-listing.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import BookingCalendar from 'react-booking-calendar';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const bookings = [
  new Date(2016, 7, 1),
  new Date(2016, 7, 2),
  new Date(2016, 7, 3),
  new Date(2016, 7, 9),
  new Date(2016, 7, 10),
  new Date(2016, 7, 11),
  new Date(2016, 7, 12),
];

class SingleListing extends React.Component {
  render() {
    return (
      <div className="parent">
        <div className="top-row">
          <div className="slides">
            <Slideshow className="photos"/>
          </div>
          
          <div className="dates">
            <BookingCalendar className="calendar" bookings={bookings} />
            <button>Book Now</button>
          </div>
        </div>

        <div className="info">
          <h1><b>TITLE</b></h1>
          <p>[TYPE]</p>
          <p>[COST]</p>
          <p>[DESCRIPTION]<br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <Footer />
      </div>
    );
  }
}

export default SingleListing;
