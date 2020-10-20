import React, { Component } from 'react'; 
import axios from 'axios';
import ReviewCard from './ReviewCard';

class Reviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reviews: []
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
        axios.get("http://localhost:3001/reviews", { withCredentials: true })
        .then(response => {
            this.setState({
                reviews: response.data
            });
        }).catch(error => {
            console.log("reviews fetch error", error);
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
                    <a href="/search_restaurants">Search Restaurants</a>
                    <a className="active" href="/reviews">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>
                <div className="review-header" >
                    <h1>Reviews</h1>
                </div>
                {this.state.reviews.length > 1 ? (
                     <div className="reviews-container" >
                        {this.state.reviews.map((review) => <ReviewCard review={review} key={review.id} />)}
                     </div>
                ) : (
                    <div className="no-reviews-container" >
                        <h1>Sorry, no reviews written as of yet!</h1>
                    </div>
                )}
            </div>
        )
    }
}

export default Reviews;