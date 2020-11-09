import React, { Component } from 'react';
import Login from './Login';
import SignUp from './Signup';
import { Redirect } from 'react-router-dom';
import AppLogo from './app_logo.png';

class home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }


    handleSuccessfulAuth(data) {
        console.log(data);
        this.props.handleLogin(data.user);
        this.props.history.push("/main");
    }
    
    
    render() {
        if (this.props.loggedInStatus === "LOGGED_IN") {
            return <Redirect to="/main" />
        }

        return (
            <div>
                <div className="main-header" >
                    <img src={AppLogo} alt=""></img>
                </div>
                <div className="home-container">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>Welcome to Chow List, your favorite hub for traveling foodies!</h1>
                    <h2>Please Login to continue</h2>
                        <h2>OR</h2> 
                    <h2>Please Sign Up if you don't already have an account! </h2>
                    <br></br>
                    <br></br>
                    <div className="home-container-2">
                        <div className="login-container">
                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                            <br></br>
                        </div>
                        <div className="signup-container">
                            <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth}/> 
                            <br></br>
                        </div>
                        <div id="clear"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default home;
