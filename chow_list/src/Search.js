import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Restaurant from './Restaurant';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            loading: false
        }

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
    

    handleSearchSubmit = (event) => {
        event.preventDefault();

        const options = {
            method: 'GET',
            url: 'https://rapidapi.p.rapidapi.com/locations/auto-complete',
            params: {query: event.target.location.value, lang: 'en_US', units: 'mi'},
            headers: {
              'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
              'x-rapidapi-key': '7b24c70170mshddb8c777b9e94a2p1f81c9jsna522057993d1'
            }
          };
          
        this.setState({ loading: true}, () => {
            axios.request(options).then(response => {
                const location = response.data.data[0].result_object.location_id;
                const options2 = {
                    method: 'GET',
                    url: 'https://rapidapi.p.rapidapi.com/restaurants/list',
                    params: {
                      location_id: response.data.data[0].result_object.location_id,
                      lunit: 'mi',
                      limit: '30',
                      min_rating: '3',
                      currency: 'USD',
                      lang: 'en_US'
                    },
                    headers: {
                      'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                      'x-rapidapi-key': '7b24c70170mshddb8c777b9e94a2p1f81c9jsna522057993d1'
                    }
                };
                  
                  axios.request(options2).then(response => {
                    let array = response.data.data;
                    for (let i = 0; i < array.length; i++) {
                        if (array[i].location_id === location) {
                            array.splice(i, 1);
                        }
                    }
                    this.setState({
                        loading: false,
                        restaurants: array
                    });
                  }).catch(error => {
                      console.error("find restaurants",error);
                  });
              }).catch(error => {
                  console.error("find location error",error);
              });
        });
    }

    render() {
        return (
            <div>
                <div className="main-header" >
                    <h1>Chow List</h1>
                </div>

                <div className="topnav">
                    <a href="/main">Home</a>
                    <a href="/user_profile">Profile</a>
                    <a className="active" href="/search_restaurants">Search Restaurants</a>
                    <a href="/reviews">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>

                <div className="search-header" >
                    <h1>Search a Location</h1>
                </div>

                <div className="search-container">
                    <h1>Look up a location within the US or abroad!</h1>
                    <form className="search-box" onSubmit={this.handleSearchSubmit}>
                        <input id="location"name="location" type="text" size="40" placeholder="US Ex: Austin, Texas  |  Abroad Ex: London, England" />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div className="results-header" >
                    <h1>Results</h1>
                </div>

                <div className="results-container">
                    {this.state.restaurants.map((restaurant) => <Restaurant restaurant={restaurant} key={restaurant.location_id} />)}
                </div>
                
                {this.state.loading ? (
                    <div className="loader-wrapper">
                      <span className="loader"><span className="loader-inner"></span></span>
                    </div>
                ) : (
                ""
                )}
            </div>
        )
    }
}

export default Search;