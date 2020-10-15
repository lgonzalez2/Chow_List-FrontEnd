import React, { Component } from 'react'; 

class Restaurant extends Component {
    render() {
    return (
        <div className="restaurant-card">
            <h3>{this.props.restaurant.name}</h3>
        </div>
    )
}
}

export default Restaurant;