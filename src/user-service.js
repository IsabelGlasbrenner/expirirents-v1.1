import React from "react";
import { withRouter } from "react-router-dom";

const initialState = {
  email: "",
  loggedIn: false
};

class UserService extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    if (props.history.location.state) {
      this.name = props.history.location.state.name;
      this.email = props.history.location.state.email;
    }
    this.findIfLoggedIn();
  }

  findIfLoggedIn() {
    if (this.name == "") {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    this.props.getUserState();
  }

  handleChange = async event => {
    console.log("handle change called /n");
    const { name, value } = event.target;
    await this.setState({ [name]: value });
  };

  render() {
    return <div className="parent"></div>;
  }
}

export default withRouter(UserService);
