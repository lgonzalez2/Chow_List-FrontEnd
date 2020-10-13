import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
                <br></br>
                <button onClick={() => this.handleLogoutClick()}>Logout</button>
                <h1>{this.props.loggedInStatus}</h1>
            </div>
        )
    }
}

export default Main;