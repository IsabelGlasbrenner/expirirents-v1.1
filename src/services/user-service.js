import React from 'react';

const isLoggedIn = false;

const initialState = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	email: "",
	password: ""
};

const UserService = {
    

    getLoggedIn: function() {
        return isLoggedIn;
    },

    setLoggedIn: function(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;
        console.log("isLoggedIn: " + isLoggedIn)
    }
};

export default UserService;
