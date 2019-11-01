import React from "react";
import mountains from "./images/mountains.jpg";
import "./css/App.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
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
            <label className="input">Search</label>
            <input type="text" className="input" />
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
