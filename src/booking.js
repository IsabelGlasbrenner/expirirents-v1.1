import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkout';



class Booking extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state)
        {
            const { listing, price } = this.props.location.state;
        console.log("ABC", listing);
        }
        console.log(this.props);
    }

    componentDidMount() {

    }
    render() {
        return (
            <StripeProvider apiKey="pk_test_NYZ95kYjokIKwalZO7GJTIfd00lx09wzFm">
                <div className="example">
                    <h1>Checkout</h1>
                    <Elements>
                        <CheckoutForm price = { this.props.location.state.price }/>
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}

export default Booking;