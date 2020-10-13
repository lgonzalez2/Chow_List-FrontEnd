import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

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

    render() {
        if (this.props.loggedInStatus === "NOT_LOGGED_IN") {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h1>Chow List Main Page</h1>
                <br></br>
                <div className="topnav">
                    <a className="active" href="#home">Home</a>
                    <a href="#news">Profile</a>
                    <a href="#contact">Search Restaurants</a>
                    <a href="#about">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>
                <br></br>
                <div className="greeting">
                    <h1>Welcome to Chow List</h1>
                    <h1 className="username">{this.props.user.username}</h1>
                </div>
            </div>
        )
    }
}

export default Main;