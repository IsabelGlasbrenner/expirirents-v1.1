import React from "react";
import "./css/listings.css";
import Slideshow from "./components/slideshow.js";
import Footer from "./components/footer.js";
import Header from "./components/header.js";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import { IoMdAdd } from "react-icons/io";
import { Button } from "react-floating-action-button";

import SelectUSState from "react-select-us-states";
import moment from "moment";
import Helmet from "react-helmet";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { formatDate, parseDate } from "react-day-picker/moment";

const initialState = {
  data: [],
  fData: [],
  location: "",
  to: undefined,
  from: undefined,
  type: ""
};

let saveState = {
  email: "",
  name: ""
};

let loggedIn = false;

class Listings extends React.Component {
  optType = ["", "ATV", "RV", "Boat"];

  constructor(props) {
    super(props);
    this.handleLocChange = this.handleLocChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = initialState;

    if (props.history.location.state) {
      this.name = props.history.location.state.name;
      this.email = props.history.location.state.email;
    }

    this.state.email = this.email;
    console.log("name listings----->" + this.name);
    console.log("email listings-----> " + this.email);

    if (!saveState.email) {
      saveState.email = this.email;
    }
    if (!saveState.name) {
      saveState.name = this.name;
    }
    console.log("saved state email listings-----> " + saveState.email);

    if (saveState.email) {
      loggedIn = true;
    }
  }

  componentDidMount() {
    this.setState({ location: this.props.location.state.location });
    this.setState({ to: this.props.location.state.to });
    this.setState({ from: this.props.location.state.from });
    this.setState({ type: this.props.location.state.type });

    fetch("http://18.224.3.21/user/showListing", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ data: data });
        this.setState({
          fData: this.filterData(data, {
            type: this.state.type,
            location: this.state.location,
            to: this.state.to,
            from: this.state.from
          })
        });
      });
  }

  filterData(data, filters) {
    var filtData = data;
    filtData = filtData.filter(function(filtData) {
      if (filters.type === "") {
        return true;
      }
      return filtData.vehicleType === filters.type;
    });

    filtData = filtData.filter(function(filtData) {
      if (filters.location == "") {
        return true;
      }
      return filtData.state === filters.location;
    });

    filtData = filtData.filter(function(filtData) {
      if (!filters.to || !filters.from) {
        return true;
      }
      return (
        Date.parse(filtData.availableDate.DateSpan[0].startDate) <=
          Date.parse(filters.to) &&
        Date.parse(filtData.availableDate.DateSpan[0].endDate) >=
          Date.parse(filters.from)
      );
    });
    return filtData;
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleLocChange(loc) {
    loc = this.abbrState(loc);
    this.setState({ location: loc });
  }

  handleTypeChange = val => event => {
    this.setState({ type: event.target.value });
  };

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
  }

  handleSearch() {
    this.setState({
      fData: this.filterData(this.state.data, {
        type: this.state.type,
        location: this.state.location,
        to: this.state.to,
        from: this.state.from
      })
    });
  }

  handleReset() {
    this.setState({ location: "" });
    this.setState({ to: undefined });
    this.setState({ from: undefined });
    this.setState({ type: "" });
    this.handleSearch();
  }

  abbrState(input) {
    var states = [
      ["Arizona", "AZ"],
      ["Alabama", "AL"],
      ["Alaska", "AK"],
      ["Arkansas", "AR"],
      ["California", "CA"],
      ["Colorado", "CO"],
      ["Connecticut", "CT"],
      ["Delaware", "DE"],
      ["Florida", "FL"],
      ["Georgia", "GA"],
      ["Hawaii", "HI"],
      ["Idaho", "ID"],
      ["Illinois", "IL"],
      ["Indiana", "IN"],
      ["Iowa", "IA"],
      ["Kansas", "KS"],
      ["Kentucky", "KY"],
      ["Louisiana", "LA"],
      ["Maine", "ME"],
      ["Maryland", "MD"],
      ["Massachusetts", "MA"],
      ["Michigan", "MI"],
      ["Minnesota", "MN"],
      ["Mississippi", "MS"],
      ["Missouri", "MO"],
      ["Montana", "MT"],
      ["Nebraska", "NE"],
      ["Nevada", "NV"],
      ["New Hampshire", "NH"],
      ["New Jersey", "NJ"],
      ["New Mexico", "NM"],
      ["New York", "NY"],
      ["North Carolina", "NC"],
      ["North Dakota", "ND"],
      ["Ohio", "OH"],
      ["Oklahoma", "OK"],
      ["Oregon", "OR"],
      ["Pennsylvania", "PA"],
      ["Rhode Island", "RI"],
      ["South Carolina", "SC"],
      ["South Dakota", "SD"],
      ["Tennessee", "TN"],
      ["Texas", "TX"],
      ["Utah", "UT"],
      ["Vermont", "VT"],
      ["Virginia", "VA"],
      ["Washington", "WA"],
      ["West Virginia", "WV"],
      ["Wisconsin", "WI"],
      ["Wyoming", "WY"]
    ];

    for (var i = 0; i < states.length; i++) {
      if (states[i][1] == input) {
        return states[i][0];
      }
    }
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="parent">
        <Header />
        <Link to="/add-listing">
          {loggedIn ? (
            <button className="add-button">
              <IoMdAdd />
            </button>
          ) : null}
        </Link>

        <div className="page">
          <div className="filters">
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
                  onDayClick: () => this.to.getInput().focus()
                }}
                onDayChange={this.handleFromChange}
              />{" "}
              —{" "}
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
                    numberOfMonths: 2
                  }}
                  onDayChange={this.handleToChange}
                />
              </span>
              <Helmet>
                <style>{`
								.InputFromTo {
									color:black;
									height:50px;
								}
								.InputFromTo .DayPickerInput{
									height: 50px;
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
									z-index:2;
								}
								.InputFromTo-to .DayPickerInput-Overlay {
									margin-left: 0px;
									color:black;
								}
								`}</style>
              </Helmet>
              <SelectUSState
                className="state-dropdown"
                onChange={this.handleLocChange}
              />
              <select
                className="form-control"
                onChange={this.handleTypeChange("type")}
              >
                <option value="">Type...</option>
                <option value="off roader">off roader</option>
                <option value="RV">RV</option>
                <option value="Boat">Boat</option>
              </select>
              <button onClick={this.handleSearch}>Search</button>
              <button onClick={this.handleReset}>Reset</button>
            </div>
          </div>

          <hr />

          <div>
            <h2>Find your next rental</h2>
            <h4>Explore hundreds of listings</h4>
          </div>

				<div className="grid-container"> {
					this.state.fData.map((listings, i) => {
						return (
							<div key={i} className="card">
								<Slideshow images={['https://amp.businessinsider.com/images/5bb256ca9a4ab803db619ada-750-544.jpg','https://s3.amazonaws.com/images.rvs.com/images/popular-brands/2018-thor_freedom_elite.jpg','https://cdn2.rvtrader.com/v1/media/5dd256bc2f0d6941c929e897.jpg?width=1024&height=768&quality=70']}/>
								<Link to={{pathname: '/single-listing', state: {listID: listings._id}}}>
									<Container fluid style={{ lineHeight: '3px' }} className="container">
										<Row justify="start">
											<Col>
												<p id="type"><span>{listings.vehicleType}</span></p>
											</Col>
											<Col>
												<p id="location">{listings.city}</p>
											</Col>
										</Row>
										<Row>
											<Col>
												<h3>{listings.vehicleName}</h3>
												<h5>${listings.price}/day</h5>
											</Col>
										</Row>
									</Container>
								</Link>
							</div>
						);
					})
				}</div>
				<Footer />
     	 	</div>
	  	</div>
    );
  }
}

export default Listings;
