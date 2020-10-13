import React, { Component } from 'react';
import axios from "axios";

class login extends Component {
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            loginErrors: "",
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target
        
        this.setState({
            [name]: value
        })
    };


    login = (event) => {
        event.preventDefault()
        event.target.reset()

        const {username, password} = this.state

        axios.post("http://localhost:3001/sessions", {
            username: username,
            password: password
        }, 
        { withCredentials: true})
        .then(response => {
            console.log(response.data);
            if (response.data.logged_in) {
                this.props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("login error", error);
            this.setState({
                registrationErrors: "Sorry, that username/password doesn't exist! Please try again!"
            });
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <button type="submit">Submit</button>
                </form>
                {this.state.loginErrors !== "" ? (
                    <span className="error">
                        {this.state.loginErrors}
                    </span>
                ) : (
                ""
                )}
            </div>
        );
    }
}

export default login;