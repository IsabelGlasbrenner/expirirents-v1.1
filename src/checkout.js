import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './css/checkout.css';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false}
    this.submit = this.submit.bind(this);
  }
  
  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    console.log(token);
    var details = { 'stripeToken' : token.id , 'amount' : this.props.price * 100, 'currency' : 'USD' } 
    console.log("Check",this.props);
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let response = await fetch("http://18.224.3.21/user/charge", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        "Accept": "application/json"
    },
    body: formBody
      
    })
    //if (response.ok) this.setState({complete: true})
  
    .then(res => { 
        console.log(res);
        return res.json();
    })
    .then(data => {
        if(data === "success")
        this.setState({complete: true});
        console.log("Returned Data: ", data);
    })
    .catch(err => console.log(err));

  }

  render() {
    if (this.state.complete) return <h1>Thank You For Booking on expiriRents!</h1>

    return (
      <div className="checkout">
        <p>Please put in your payment information:</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);