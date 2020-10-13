import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Main from './Main';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';


class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    }).catch(error => {
      console.log("Check login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }


  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data
    });
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }


  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"
            render={props => (
              <Home 
                {...props} 
                handleLogin={this.handleLogin} 
                handleLogout={this.handleLogout} 
                loggedInStatus={this.state.loggedInStatus} />
            )}>
            </Route>
            
            <Route exact path='/main' 
            render={props => (
              <Main 
              {...props} 
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout} />
            )}>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
