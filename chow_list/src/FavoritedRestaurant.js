import React, { Component } from 'react'; 
import { Card } from 'semantic-ui-react';

class FavoritedRestaurant extends Component {
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
            {/* <Card.Content extra >
                <div className="ui bottom attached button" onClick={() => this.handleClick()}>
                    <i className="add icon"></i>
                    Add to Your List
                </div>
            </Card.Content> */}
        </Card>
    )
}
}

export default FavoritedRestaurant;