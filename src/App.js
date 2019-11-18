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
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';


class App extends React.Component {
  opt = ["Motorcycle", "Dirt Bike", "Mountain Bike", "ATV", "Boat"];

  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: "",
	  to: "",
	  type: "",
	  location: ""
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }
  
  handleLocChange = val => (event) => {
	  this.setState({location: event.target.value});
	}
	
	handleTypeChange = val => (event) => {
		this.setState({type: event.target.value});
	}

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
	this.setState({ from });
  }

  handleToChange(to) {
	this.setState({ to }, this.showFromMonth);
  }

  printState() {
	  console.log(this.state);
  }
  

  render() {
	{this.printState()}
    const { from, to} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <img src={mountains} className="Mountains" alt="Mountains" />
          <h2 className="heading">
            Check out the recreational items for rent in your area...
          </h2>
          <div className="searchBox">
            <input type="text" className="input" placeholder="Location" onChange={this.handleLocChange}/>

			<select className="form-control" onChange={this.handleTypeChange("type")}>
				<option value="" selected="">Type...</option>
				<option value="off roader">off roader</option>
				<option value="RV">RV</option>
				<option value="Boat">Boat</option>
			</select>

			<div className="InputFromTo">
				<DayPickerInput
					value={from}
					placeholder="From"
					format="LL"
					formatDate={formatDate}
					parseDate={parseDate}
					dayPickerProps={{
						selectedDays: [from, { from, to }],
						disabledDays: { after: to },
						toMonth: to,
						modifiers,
						numberOfMonths: 2,
						onDayClick: () => this.to.getInput().focus(),
					}}
					onDayChange={this.handleFromChange}
				/>
				<span className="InputFromTo-to">
				<DayPickerInput
					ref={el => (this.to = el)}
					value={to}
					placeholder="To"
					format="LL"
					formatDate={formatDate}
					parseDate={parseDate}
					dayPickerProps={{
					selectedDays: [from, { from, to }],
					disabledDays: { before: from },
					modifiers,
					month: from,
					fromMonth: from,
					numberOfMonths: 2,
					}}
					onDayChange={this.handleToChange}
				/>
				</span>
				<Helmet>
				<style>{`
					.InputFromTo {
						color:black;
					}
					.InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
						background-color: #f0f8ff !important;
						color: #4a90e2;
					}
					.InputFromTo .DayPicker-Day {
						border-radius: 0 !important;
					}
					.InputFromTo .DayPicker-Day--start {
						border-top-left-radius: 50% !important;
						border-bottom-left-radius: 50% !important;
					}
					.InputFromTo .DayPicker-Day--end {
						border-top-right-radius: 50% !important;
						border-bottom-right-radius: 50% !important;
					}
					.InputFromTo .DayPickerInput-Overlay {
						width: 550px;
					}
					.InputFromTo-to .DayPickerInput-Overlay {
						margin-left: 0px;
						color:black;
					}
					`}</style>
				</Helmet>
			</div>
            <Link to={{pathname: '/listings', state: {location: this.state.location, to: this.state.to, from: this.state.from, type: this.state.type}}}><input type="submit" value="Search" /></Link>
          </div>
        </header>
        <Footer />
      </div>
    );
  }
}

export default App;
