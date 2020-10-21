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
            if (response.data.status === "created") {
                this.props.handleSuccessfulAuth(response.data);
            } else {
                this.setState({
                    loginErrors: "Sorry, that username/password doesn't exist! Please try again!"
                });
            }
        }).catch(error => {
            console.log("login error", error);
            this.setState({
                loginErrors: "Sorry, that username/password doesn't exist! Please try again!"
            });
        });
    }

    render() {
        return (
            <div>
                <form className="login-form" onSubmit={this.login}>
                    <div className="login-username" >
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    </div>
                    <div className="login-password">
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {this.state.loginErrors !== "" ? (
                    <div className="error">
                        {this.state.loginErrors}
                    </div>
                ) : (
                ""
                )}
            </div>
        );
    }
}

export default login;