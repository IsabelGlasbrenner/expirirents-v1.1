import React from "react";
import mountains from "./images/mountains.jpg";
import "./css/App.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import adventure_text from "./images/adventure_text.png";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class App extends React.Component {

  opt = ["Motorcycle", "Dirt Bike", "Mountain Bike", "ATV", "Boat"];
  // state = {
  //   stateDate: new Date(),
  //   endDate: new Date()
  // };

  // handleChange = date => {
  //   this.setState({
  //     startDate: date
  //   });
  // };

  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={mountains} className="Mountains" alt="Mountains" />
          <h2 className="heading">
            Check out the ATV's for rent in your area...
          </h2>
          <div className="searchBox">
            <label className="title">Location</label>
            <input type="text" className="input" />

            <Dropdown options={this.opt} className="filters" />
            <p>
              {!from && !to && 'Please select the first day.'}
              {from && !to && 'Please select the last day.'}
              {from &&
                to &&
                `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
              {from && to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
            </button>
              )}
            </p>
            <DayPicker
              className="Selectable"
              numberOfMonths={this.props.numberOfMonths}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={this.handleDayClick}
            />
            <Helmet>
              <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
            </Helmet>
            {/* <label className="title">
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
              selected={this.state.endDate}
              onSelect={this.handleSelect}
              onChange={this.handleChange}
            /> */}

            <input type="submit" value="Search" />
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
