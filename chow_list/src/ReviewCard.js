import React, { Component } from 'react'; 
import { Card, Rating } from 'semantic-ui-react';
import Logo from './empty_avatar.png';

class ReviewCard extends Component {

    render() {
        console.log(this.props.review);
    return (
        <Card color="blue">
            <Card.Content>
                <div className="user-detail" >
                    <img src={this.props.review.user.photo} alt="Avatar" className="avatar" ></img>
                    <h2 className="review-username" >{this.props.review.user.username}</h2>
                </div>
            </Card.Content>
            <img src={this.props.review.restaurant.image} alt={Logo} height={250}/>
            <Card.Content>
                <Card.Header color="black">{this.props.review.restaurant.name}</Card.Header>
                <br></br>
                <div>"{this.props.review.description}"</div>
            </Card.Content>
            <Card.Content extra >
                <Rating icon='star' defaultRating={this.props.review.rating} maxRating={5} disabled/>
            </Card.Content>
            <Card.Content extra >
                <a className="link" href={this.props.review.restaurant.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                </a>
            </Card.Content>
        </Card>
    )
}
}

export default ReviewCard;