import React from 'react';

export class UserService {
    constructor() {
        this.myEmail = "";
        this.isLoggedIn = false;
    }
    
    getLoggedIn() {
        return this.isLoggedIn;
    }

    setLoggedIn(i) {
        this.isLoggedIn = i;
        console.log("isLoggedIn: " + this.isLoggedIn)
    }

    getEmail() {
        return this.myEmail;
    }

    setEmail(e) {
        this.myEmail = e;
    }
};

export default UserService;
