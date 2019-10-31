import React from 'react';
import './css/footer.css';
import logo from '../logo.svg';

const Footer = () => {
  return (
    <footer>
      <div class="container">
        <div className="menu">
          <ul class="footer-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Listings</a></li>
            <li><a href="#">Create Listing</a></li>
          </ul>
        </div>
        <div className="social-links">
          <p>links here</p>
        </div>
        <p>© Copyright 2019 Expirirents - All Rights Reserved</p>
      </div>
    </footer>
  )
}

export default Footer;