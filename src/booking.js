import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './checkout';
import Footer from "./components/footer.js";
import Header from "./components/header.js";


class Booking extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state)
        {
            const { listing, price } = this.props.location.state;
        console.log("ABC", listing);
        }
        console.log("AAAAAAAAAA ",this.props);
    }

    componentDidMount() {

    }
    render() {
        return (
            <StripeProvider apiKey="pk_test_NYZ95kYjokIKwalZO7GJTIfd00lx09wzFm">
                <div className="example">
                    <Header />
                    <h1>Checkout</h1>
                    <Elements>
                        <CheckoutForm price = { this.props.location.state.price }/>
                    </Elements>
                    <Footer />
                </div>
            </StripeProvider>
        );
    }
}

export default Booking;