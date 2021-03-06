import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import AppLogo from './app_logo.png';

class Main extends Component {

    constructor(props) {
        super(props);

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
        .then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });
    }

    componentDidMount() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            return <Redirect to="/" />
        }
    }

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            return <Redirect to="/" />
        }

        return (
            <div>
                <div className="main-header" >
                    <img className="app-logo" src={AppLogo} alt=""></img>
                </div>
                <div className="topnav">
                    <a className="active" href="/main">Home</a>
                    <a href="/user_profile">Profile</a>
                    <a href="/search_restaurants">Search Restaurants</a>
                    <a href="/reviews">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>
                <div className="home-header" >
                    <h1>Home</h1>
                </div>
                <div className="main-container">
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1>Welcome to Chow List!</h1>
                    <h1 className="username">{this.props.user.username}</h1>
                    <h2 className="app-description" >
                        Chow List is a simple and easy-to-use web application that provides 
                        traveling foodies with a safe and secure environment to look up various locations,
                         favorite popular restaurants as potential future destinations and leave reviews so 
                         as to let others know exactly how your experience went! </h2>
                    <h2>Click on the navigation bar above to get started!</h2>
                </div>
            </div>
        )
    }
}

export default Main;