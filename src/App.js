import React from "react";
import mountains from "./images/mountains.jpg";
import "./css/App.css";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import 'react-dropdown/style.css';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import SelectUSState from 'react-select-us-states';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from 'moment';
import Helmet from 'react-helmet';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';


class App extends React.Component {
  constructor(props) {
    super(props);
	this.handleLocChange = this.handleLocChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
	this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
	  to: undefined,
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
  
  	handleLocChange(loc) {
	  loc = this.abbrState(loc);
	  this.setState({location: loc});
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

	abbrState(input){
    
		var states = [
			['Arizona', 'AZ'],
			['Alabama', 'AL'],
			['Alaska', 'AK'],
			['Arkansas', 'AR'],
			['California', 'CA'],
			['Colorado', 'CO'],
			['Connecticut', 'CT'],
			['Delaware', 'DE'],
			['Florida', 'FL'],
			['Georgia', 'GA'],
			['Hawaii', 'HI'],
			['Idaho', 'ID'],
			['Illinois', 'IL'],
			['Indiana', 'IN'],
			['Iowa', 'IA'],
			['Kansas', 'KS'],
			['Kentucky', 'KY'],
			['Louisiana', 'LA'],
			['Maine', 'ME'],
			['Maryland', 'MD'],
			['Massachusetts', 'MA'],
			['Michigan', 'MI'],
			['Minnesota', 'MN'],
			['Mississippi', 'MS'],
			['Missouri', 'MO'],
			['Montana', 'MT'],
			['Nebraska', 'NE'],
			['Nevada', 'NV'],
			['New Hampshire', 'NH'],
			['New Jersey', 'NJ'],
			['New Mexico', 'NM'],
			['New York', 'NY'],
			['North Carolina', 'NC'],
			['North Dakota', 'ND'],
			['Ohio', 'OH'],
			['Oklahoma', 'OK'],
			['Oregon', 'OR'],
			['Pennsylvania', 'PA'],
			['Rhode Island', 'RI'],
			['South Carolina', 'SC'],
			['South Dakota', 'SD'],
			['Tennessee', 'TN'],
			['Texas', 'TX'],
			['Utah', 'UT'],
			['Vermont', 'VT'],
			['Virginia', 'VA'],
			['Washington', 'WA'],
			['West Virginia', 'WV'],
			['Wisconsin', 'WI'],
			['Wyoming', 'WY'],
		];
	
		for(var i = 0; i < states.length; i++){
			if(states[i][1] == input){
				return(states[i][0]);
			}
		}    
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
		  	<SelectUSState className="state-dropdown" onChange={this.handleLocChange}/>
			<select className="form-control" onChange={this.handleTypeChange("type")}>
				<option value="">Type...</option>
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
