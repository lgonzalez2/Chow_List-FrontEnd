import React, { Component } from 'react'; 
import { Card, Icon } from 'semantic-ui-react';

class Restaurant extends Component {
    render() {
    return (
        <Card color="blue">
            <img src={this.props.restaurant.photo.images.medium.url} alt="" height={250}/>
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
        </Card>
    )
}
}

export default Restaurant;