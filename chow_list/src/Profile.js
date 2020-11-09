import React, { Component } from 'react'; 
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Logo from './empty_avatar.png';
import FavoritedRestaurant from './FavoritedRestaurant';
import AppLogo from './app_logo.png';

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showPicForm: false,
            showBioForm: false,
            favoriteRestaurants: [],
            showList: false
        }

        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handlePhotoBtnClick = this.handlePhotoBtnClick.bind(this);
        this.handleBioBtnClick = this.handleBioBtnClick.bind(this);
    }

    handleFavoriteRestaurantDelete = (restaurant_id) => {
        let favorites = [];
        console.log(restaurant_id);
        axios.get(`https://chow-list.herokuapp.com/restaurants/${restaurant_id}`, { withCredentials: true })
        .then(response => {
            favorites = response.data.favorite_restaurants;
            console.log(favorites);
            const currentFavorite = favorites.filter(f => f.user_id === this.props.user.id);
            console.log(currentFavorite[0]);
            
            axios.delete(`https://chow-list.herokuapp.com/favorite_restaurants/${currentFavorite[0].id}`, { withCredentials: true })
            .then(response => {
                this.setState({
                    showList: false
                });
                alert("Restaurant deleted!")
            }).catch(error => {
                console.log("favorite restaurant delete error", error);
            });
        }).catch(error => {
            console.log("restaurant fetch error", error);
        });
    }


    handlePhotoBtnClick() {
        this.setState({
            showPicForm: !this.state.showPicForm
        });
    }

    handleBioBtnClick() {
        this.setState({
            showBioForm: !this.state.showBioForm
        });
    }

    updatePic = (event) => {
        event.preventDefault();

        this.setState({
            showPicForm: !this.state.showPicForm
        });

        axios.patch(`https://chow-list.herokuapp.com/users/${this.props.user.id}`, {
            photo: event.target.photo.value,
            bio: this.props.user.bio
        }, { withCredentials: true })
        .then(response => {
            this.props.handleUserUpdate(response.data.user);
        }).catch(error => {
            console.log("update error", error);
        });
    }

    updateBio = (event) => {
        event.preventDefault();

        this.setState({
            showBioForm: !this.state.showBioForm
        });

        axios.patch(`https://chow-list.herokuapp.com/users/${this.props.user.id}`, {
            photo: this.props.user.photo,
            bio: event.target.bio.value
        }, { withCredentials: true })
        .then(response => {
            this.props.handleUserUpdate(response.data.user);
        }).catch(error => {
            console.log("update error", error);
        });
    }

    handleLogoutClick() {
        axios.delete("https://chow-list.herokuapp.com/logout", { withCredentials: true })
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

    handleListClick() {
        axios.get(`https://chow-list.herokuapp.com/users/${this.props.user.id}`, { withCredentials: true })
        .then(response => {
            console.log(response.data);
            this.setState({
                showList:true,
                favoriteRestaurants: response.data.restaurants
            });
        }).catch(error => {
            console.log("user fetch error", error);
        });
    }


    render() {
        let img = this.props.user.photo;
        let bio = this.props.user.bio;
        
        if (img === "") {
            img = Logo;
        }
        if (bio === "") {
            bio = "You currently do not have a bio, please click on the 'Add/Change Bio' button to add one!"
        }

        return (
            <div>
                <div className="main-header" >
                    <img className="app-logo" src={AppLogo} alt=""></img>
                </div>

                <div className="topnav">
                    <a href="/main">Home</a>
                    <a className="active" href="/user_profile">Profile</a>
                    <a href="/search_restaurants">Search Restaurants</a>
                    <a href="/reviews">Reviews</a>
                    <a href="/" onClick={() => this.handleLogoutClick()}>Logout</a>
                </div>

                <div className="profile-header" >
                    <h1>My Profile</h1>
                </div>

                <div className="profile-container">
                    <div className="pic-container">
                        <img className="profile-img" src={img} alt=""></img>
                        <br></br>
                        <button onClick={() => this.handlePhotoBtnClick()}>Add/Change Profile Pic</button>
                        {this.state.showPicForm ? (
                            <div className="photo-form-container">
                                <form className="pic-form" onSubmit={this.updatePic}>
                                    <br></br>
                                    <div className="pic-input">
                                        <input type="text" name="photo" placeholder="Your Photo Url"/>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        ) : (
                        ""
                        )}
                    </div>
                    <div className="info-container">
                        <br></br>
                        <br></br>
                        <h1 className="username">{this.props.user.username}</h1>
                        <div className="bio-container" >
                            <h3>{bio}</h3>
                        </div>
                        <br></br>
                        <button onClick={() => this.handleBioBtnClick()}>Add/Change Bio</button>
                        {this.state.showBioForm ? (
                            <div className="info-form-container">
                                <form className="bio-form" onSubmit={this.updateBio}>
                                    <br></br>
                                    <div>
                                        <textarea type="text" name="bio" placeholder="Enter a short bio"/>
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        ) : (
                        ""
                        )}
                    </div>
                    <div id="clear"></div>
                </div>

                {this.state.showList === false ? (
                    <div className= "list-button-container">
                        <button onClick={() => this.handleListClick()}>Show Bucket List</button>
                    </div>
                ) : (
                 <div>
                    <div className="list-header" >
                        <h1>My Bucket List</h1>
                    </div>
                    <div className="list-container">
                        {this.state.favoriteRestaurants.map((r) => <FavoritedRestaurant restaurant={r} key={r.id} user={this.props.user} handleDelete={this.handleFavoriteRestaurantDelete} />)}    
                    </div>
                </div>
                )}
            </div>
        )
    }
}

export default Profile;