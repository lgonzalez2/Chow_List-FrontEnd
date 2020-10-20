import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';

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
                    <form>
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