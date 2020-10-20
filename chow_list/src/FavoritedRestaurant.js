import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';
import axios from 'axios';

class FavoritedRestaurant extends Component {

    constructor() {
        super();

        this.state = {
            showForm: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState(previousState => {
            return {
                showForm: !previousState.showForm
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        event.persist();

        console.log(this.props.restaurant.id);
        console.log(this.props.user.id);
        console.log(event.target.description.value);
        console.log(event.target.rating.value);
        
        axios.post("http://localhost:3001/reviews", {
            description: event.target.description.value,
            rating: event.target.rating.value,
            user_id: this.props.user.id,
            restaurant_id: this.props.restaurant.id
        }, 
        { withCredentials: true})
        .then(response => {
            if (response.data.status === 'created') {
                console.log(response);
                alert("Review added to reviews page!");
                this.setState({
                    showForm: false
                });
            }
        }).catch(error => {
            console.log("review create error", error);
        });
    }


    render() {
    return (
        <Card color="blue">
            <img src={this.props.restaurant.image} alt="" height={250}/>
            <Card.Content>
                <Card.Header>{this.props.restaurant.name}</Card.Header>
                <Card.Meta>Price Level: {this.props.restaurant.price_level}</Card.Meta>
                <br></br>
                <Card.Header>Overall Ranking: {this.props.restaurant.rating}</Card.Header>
            </Card.Content>
            <Card.Content extra >
                <a className="link" href={this.props.restaurant.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </Card.Content>
            <Card.Content extra >
                <div className="ui bottom attached button" onClick={() => this.handleClick()}>
                    <i className="add icon"></i>
                    Write a Review
                </div>
            </Card.Content>
            {this.state.showForm ? (
                <Card.Content extra >
                    <form onSubmit={this.handleSubmit} >
                        <textarea className="review-description" type="text" name="description" placeholder="What did you think?" />
                        <br></br>
                        <div>
                            Rating: 
                            <select className="dropdown" type="dropdown" name= "rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <button className="review-submit" type="submit">Submit</button>
                    </form>
                </Card.Content>
            ) : (
                ""
            )}
        </Card>
    )
}
}

export default FavoritedRestaurant;