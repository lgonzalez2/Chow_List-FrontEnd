import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import Main from './Main';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import Profile from './Profile';  
import Search from './Search';
import Reviews from './Reviews';


class App extends Component {

  constructor() {
    super()

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);
  }


  checkLoginStatus() {
    axios.get("https://chow-list.herokuapp.com/logged_in", { headers: {
      'Access-Control-Allow-Origin': '*',
    }, ithCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
        console.log(response.data.user);
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
    console.log(data);
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

  handleUserUpdate(data) {
    this.setState({
      user: data
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
              handleLogout={this.handleLogout}
              user={this.state.user} />
            )}>
            </Route>

            <Route exact path='/user_profile' 
            render={props => (
              <Profile 
              {...props} 
              loggedInStatus={this.state.loggedInStatus}
              handleLogout={this.handleLogout}
              handleUserUpdate={this.handleUserUpdate}
              user={this.state.user} />
            )}>
            </Route>

            <Route exact path="/search_restaurants"
            render={props => (
              <Search 
                {...props} 
                handleLogout={this.handleLogout} 
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user} />
            )}>
            </Route>

            <Route exact path="/reviews"
            render={props => (
              <Reviews 
                {...props} 
                handleLogout={this.handleLogout} 
                loggedInStatus={this.state.loggedInStatus}
                user={this.state.user} />
            )}>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
