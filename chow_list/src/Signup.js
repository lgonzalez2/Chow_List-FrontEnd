import React, { Component } from 'react';
import axios from "axios";

class signup extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
        }
    }


    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value
        })
    };


    createUser = (event) => {
        event.preventDefault()
        event.target.reset()
        const { username, password, password_confirmation } = this.state

        axios.post("http://localhost:3001/registrations", {
            username: username,
            password: password,
            password_confirmation: password_confirmation,
            photo: '',
            bio: ''
        }, 
        { withCredentials: true})
        .then(response => {
            if (response.data.status === 'created') {
                this.props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("registration error", error);
            this.setState({
                registrationErrors: "Sorry, either that username is already taken, or the passwords didn't match! Please try again!"
            });
        });
    }





    render() {
        return (
            <div>
                <form className="signup-form" onSubmit={this.createUser}>
                    <div className="signup-username" >
                        <input type="text" name="username" placeholder="Username" onChange={this.handleChange} required/>
                    </div>
                    <div className="signup-password" >
                        <input type="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                    </div>
                    <div className="signup-password-confirmation" >
                        <input type="password" name="password_confirmation" placeholder="Password Confirmation" onChange={this.handleChange} required/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                {this.state.registrationErrors !== "" ? (
                    <div className="signup-error">
                        {this.state.registrationErrors}
                    </div>
                ) : (
                ""
                )}
            </div>
        );
    }
}

export default signup;
