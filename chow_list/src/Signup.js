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
                registrationErrors: "Sorry, that username is already taken! Please pick another!"
            });
        });
    }





    render() {
        return (
            <div>
                <form onSubmit={this.createUser}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                    <input type="password" name="password_confirmation" placeholder="Password Confirmation" onChange={this.handleChange} required/>
                    <button type="submit">Submit</button>
                </form>
                {this.state.registrationErrors !== "" ? (
                    <span className="error">
                        {this.state.registrationErrors}
                    </span>
                ) : (
                ""
                )}
            </div>
        );
    }
}

export default signup;
