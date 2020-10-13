import React, { Component } from 'react';
import Login from './Login';
import SignUp from './Signup';
import { Redirect } from 'react-router-dom';

class home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }


    handleSuccessfulAuth(data) {
        this.props.handleLogin(data.user);
        this.props.history.push("/main");
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
            </div>
        );
    }
}

export default home;
