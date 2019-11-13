import React from "react";
import "./css/footer.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="menu">
          <ul className="footer-menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Listings</a>
            </li>
            <li>
              <a href="#">New List</a>
            </li>
          </ul>
        </div>
        <div className="social-icons">
          <SocialIcon
            url="http://twitter.com/"
            fgColor="#FFFFFF"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="http://facebook.com/"
            fgColor="#FFFFFF"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="http://instagram.com/"
            fgColor="#FFFFFF"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="http://yelp.com/"
            fgColor="#FFFFFF"
            style={{ height: 35, width: 35 }}
          />
          <SocialIcon
            url="http://pinterest.com/"
            fgColor="#FFFFFF"
            style={{ height: 35, width: 35 }}
          />
        </div>
        <p>© Copyright 2019 Expirirents - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
