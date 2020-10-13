import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import SignUp from './Signup';
import { Redirect } from 'react-router-dom';

class home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }


    handleSuccessfulAuth(data) {
        this.props.handleLogin(data.user);
        this.props.history.push("/main");
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });
    }
    
    
    render() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            return <Redirect to="/main" />
        }

        return (
            <div>
                <h1>Chow List Login/SignUp Page</h1><br/>
                <div>
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    <br></br>
                </div>
                <div>
                    <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth}/> 
                    <br></br>
                </div>
                <button onClick={() => this.handleLogoutClick()} >Logout</button>
            </div>
        );
    }
}

export default home;
