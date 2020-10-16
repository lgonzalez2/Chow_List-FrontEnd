import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';
import NoImage from './noimageavailable.jpg';
import axios from 'axios';

let img = "";

class Restaurant extends Component {


    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let price_level = "";

        if (this.props.restaurant.price_level === "") {
            price_level = this.props.restaurant.price;
        } else {
            price_level = this.props.restaurant.price_level;
        }

        axios.post("http://localhost:3001/restaurants", {
                    name: this.props.restaurant.name,
                    image: img,
                    website: this.props.restaurant.website,
                    price_level: price_level,
                    rating: this.props.restaurant.ranking,
                    location_id: this.props.location
                }, 
                { withCredentials: true})
                .then(response => {
                    if (response.data) {
                        
                        
                        axios.post("http://localhost:3001/favorite_restaurants", {
                            user_id: this.props.user.id,
                            restaurant_id: response.data.restaurant.id
                        }, 
                        { withCredentials: true})
                        .then(response => {
                            if (response.data.status === 'created') {
                                console.log(response.data.favorite_restaurant)
                                alert("Restaurant added to Your List!")
                            }
                        }).catch(error => {
                            console.log("favorite restaurant create error", error);
                        });
                    }
                }).catch(error => {
                    console.log("restaurant create error", error);
        });
    }



    render() {

    if (this.props.restaurant.photo === undefined) {
        img = NoImage
    } else {
        img = this.props.restaurant.photo.images.medium.url
    }

    return (
        <Card color="blue">
            <img src={img} alt="" height={250}/>
            <Card.Content>
                <Card.Header>{this.props.restaurant.name}</Card.Header>
                {this.props.restaurant.price_level === "" ? (
                        <Card.Meta>Price Level: {this.props.restaurant.price}</Card.Meta>
                ) : (
                        <Card.Meta>Price Level: {this.props.restaurant.price_level}</Card.Meta>
                )}
                <br></br>
                <Card.Header>Overall Ranking: {this.props.restaurant.ranking}</Card.Header>
            </Card.Content>
            <Card.Content extra >
                <a className="link" href={this.props.restaurant.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </Card.Content>
            <Card.Content extra >
                <div className="ui bottom attached button" onClick={() => this.handleClick()}>
                    <i className="add icon"></i>
                    Add to Your List
                </div>
            </Card.Content>
        </Card>
    )
}
}

export default Restaurant;