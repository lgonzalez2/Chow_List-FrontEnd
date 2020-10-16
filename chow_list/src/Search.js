import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Restaurant from './Restaurant';

const animatedComponents = makeAnimated();

const customStyles = {
    option: (provided, state) => ({
      ...provided
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "1%",
      fontSize: 20,
      border: "2px solid black",
      boxShadow: 'none'
    })
  }  

const arrayOfOptionValues = [
    {value: "American", label: "American"}, 
    {value: "Asian", label: "Asian"}, 
    {value: "Bar", label: "Bar"}, 
    {value: "Barbecue", label: "Barbecue"}, 
    {value: "Cafe", label: "Cafe"}, 
    {value: "Cajun", label: "Cajun"}, 
    {value: "Chinese", label: "Chinese"}, 
    {value: "Contemporary", label: "Contemporary"}, 
    {value: "Fusion", label: "Fusion"}, 
    {value: "Gluten Free", label: "Gluten Free"}, 
    {value: "Grill", label: "Grill"}, 
    {value: "Healthy", label: "Healthy"}, 
    {value: "Indian", label: "Indian"}, 
    {value: "International", label: "International"}, 
    {value: "Italian", label: "Italian"}, 
    {value: "Japanese", label: "Japanese"}, 
    {value: "Latin", label: "Latin"}, 
    {value: "Mediterranean", label: "Mediterranean"}, 
    {value: "Mexican", label: "Mexican"}, 
    {value: "Pizza", label: "Pizza"}, 
    {value: "Seafood", label: "Seafood"}, 
    {value: "Southwestern", label: "Southwestern"}, 
    {value: "Steakhouse", label: "Steakhouse"}, 
    {value: "Sushi", label: "Sushi"}, 
    {value: "Vegan", label: "Vegan"}, 
    {value: "Vegetarian", label: "Vegetarian"}
];

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: [],
            loading: false,
            results: false,
            value: []
        }

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleChange = (event) => {
        this.setState({value:event});
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
        let values = [];
        let newValues = [];
        if (this.state.value !== [] || this.state.value !== null) {
            values = this.state.value.map(v => v.label);
            values.forEach(v => {
                if (v === 'American') {
                    newValues.push('9908')
                } else if (v === "Asian") {
                    newValues.push('10659')
                } else if (v === "Bar") {
                    newValues.push('10640')
                } else if (v === "Barbecue") {
                    newValues.push('10651')
                } else if (v === "Cafe") {
                    newValues.push('10642')
                } else if (v === "Chinese") {
                    newValues.push('5379')
                } else if (v === "Contemporary") {
                    newValues.push('10669')
                } else if (v === "Fusion") {
                    newValues.push('10671')
                } else if (v === "Gluten Free") {
                    newValues.push('10992')
                } else if (v === "Grill") {
                    newValues.push('10668')
                } else if (v === "Healthy") {
                    newValues.push('10679')
                } else if (v === "Indian") {
                    newValues.push('10346')
                } else if (v === "International") {
                    newValues.push('10648')
                } else if (v === "Italian") {
                    newValues.push('4617')
                } else if (v === "Japanese") {
                    newValues.push('5473')
                } else if (v === "Latin") {
                    newValues.push('10639')
                } else if (v === "Mediterraneon") {
                    newValues.push('10649')
                } else if (v === "Mexican") {
                    newValues.push('5110')
                } else if (v === "Pizza") {
                    newValues.push('10641')
                } else if (v === "Seafood") {
                    newValues.push('10643')
                } else if (v === "Southwestern") {
                    newValues.push('10634')
                } else if (v === "Steakhouse") {
                    newValues.push('10345')
                } else if (v === "Sushi") {
                    newValues.push('10653')
                } else if (v === "Vegan") {
                    newValues.push('10697')
                } else if (v === "Vegetarian") {
                    newValues.push('10665')
                } 
            })
        }

        newValues = newValues.join(', ')

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
                      combined_food: newValues,
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
                        if (array[i].location_id === location || array[i].photo === undefined) {
                            array.splice(i, 1);
                        }
                    }
                    console.log(array);
                    this.setState({
                        loading: false,
                        restaurants: array,
                        results: true
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
                        <Select name="filter" placeholder={"Optional: Looking for a specific food category/categories? Please select from below!"}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            styles={ customStyles } 
                            isMulti
                            isClearable
                            options={arrayOfOptionValues}
                            onChange={this.handleChange.bind(this)}/>
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div className="results-header" >
                    <h1>Results</h1>
                </div>

                {this.state.results !== true? (
                    <div className="no-results-container">
                        <h1>Sorry, no results yet!</h1>
                    </div>
                ) : (
                    <div className="results-container">
                        {this.state.restaurants.map((restaurant) => <Restaurant restaurant={restaurant} key={restaurant.location_id} />)}
                    </div>
                )}

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