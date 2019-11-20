import React from 'react';

class UserService {
    constructor() {
        if (UserService.instance) {
            return UserService.instance;
            
        }

        this.myEmail = "";
        this.isLoggedIn = false;
        
        UserService.instance = this;
        return this;

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
