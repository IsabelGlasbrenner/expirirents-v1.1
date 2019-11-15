import React from 'react';
import './css/listings.css';
import Slideshow from './components/slideshow.js';
import Footer from './components/footer.js';
import Header from './components/header.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { BrowserRouter as Link } from "react-router-dom";

const opt = [ "One", "Two", "Three"];
const initialState = {
	data: {}
}

class Listings extends React.Component {

	constructor(props) {
		super(props);
		this.state = initialState;
	}
	
	componentDidMount() {
		fetch("http://18.224.3.21/user/listing")
		.then(res => {
			console.log(res);
			return res.json()
		})
		.then(data => {
			this.setState({data: data});
		})
		console.log(this.state.data)
	}	

	render() {
	return (
		<div className="parent">
        <Header />
        <div className="page">
          <div className="filters">
            <Dropdown options={this.opt} className='myClassName' />
            <Dropdown options={this.opt} className='myClassName' />
            <Dropdown options={this.opt} className='myClassName' />
          </div>

          <hr/>

          <div>
            <h2>Find your next rental</h2>
            <h4>Explore hundreds of listings</h4>
          </div>
              
			<div className="grid-container"> {
				// this.state.data.map((listings, i) => {
				// 	return (
				// 		<div key={i} className="card">
				// 			<Slideshow/>
				// 			<Link to="/single-listing">
				// 			<div className="container">
				// 				<p><b>[TYPE]</b></p>
				// 				<p>[LOCATION]</p>
				// 				<p>[COST]</p>
				// 			</div>
				// 			</Link>
				// 		</div>
				// 	);
				// })
			}

        </div>
        <Footer />
      </div>
	  </div>
    );
  }
}

export default Listings;
