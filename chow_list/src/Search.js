import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class Search extends Component {

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
        return (
            <div>
                <h1>Chow List Main Page(Search Restaurants)</h1>
                <br></br>
                <div className="topnav">
                    <a href="/main">Home</a>
                    <a href="/user_profile">Profile</a>
                    <a className="active" href="/search_restaurants">Search Restaurants</a>
                    <a href="/reviews">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>
                <br></br>
                <div className="greeting">
                    <h1>Restaurant Search Page</h1>
                    <h1 className="username">{this.props.user.username}</h1>
                </div>
            </div>
        )
    }
}

export default Search;