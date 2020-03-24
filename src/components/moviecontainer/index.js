import React, { Component } from 'react'
import { connect } from 'react-redux'

// import style
import './moviecontainer.css';
import { bindActionCreators } from 'redux';
import userAction from '../../actions/user_action';
import Axios from 'axios';

class MovieContainer extends Component {

    state={
        "tag" : "t",
        "searchText" : "",
        "movieData" : "",
        "heart" : false
    }

    getMovies = (e)  => {
        this.setState({searchText : e.target.value})
        Axios.get(`http://www.omdbapi.com/?${this.state.tag}=${e.target.value}&apikey=4efb2a1f`)
        .then((res) => {
            this.setState({
                movieData: res.data,
                heart : false
            })
        })
        .catch(err => console.log(err));
    }

    getSingleMovie =(movie) => (
        <div className="single-movie">
            <img className="movie-poster" src={movie.Poster} alt={movie.Title}/>
            <div className="s-m-detail">
                <div>
                    <span className="s-m-title">Title : </span>
                    <span className="s-m-text">{movie.Title}</span>
                </div>
                <div>
                    <span className="s-m-title">Genre : </span>
                    <span className="s-m-text">{movie.Genre}</span>
                </div>
                <div>
                    <span className="s-m-title">Released Date : </span>
                    <span className="s-m-text">{movie.Released}</span>
                </div>
                <div>
                    <span className="s-m-title">Rated : </span>
                    <span className="s-m-text">{movie.Rated}</span>
                </div>
                <div>
                    <span className="s-m-title">Actors : </span>
                    <span className="s-m-text">{movie.Actors}</span>
                </div>
                <div>
                    <span className="s-m-title">Plot : </span>
                    <span className="s-m-text">{movie.Plot}</span>
                </div>
                
            </div>
        </div>
    )
    

    selected = () => {
        this.setState({
            heart : !this.state.heart
        })
        if(!this.state.heart){
            let tempuser = this.props.user;
            let changedUser = { ...tempuser, "favorites" : [ ...tempuser.favorites, this.state.movieData]}
            this.props.userAction(changedUser);
            let email = this.props.user.email;
            Axios.post('https://gentle-woodland-25742.herokuapp.com/add', {
                "email" : "dev@gmail.com",
	            "favorites" : [ ...tempuser.favorites, this.state.movieData]
            })
        }
        else {
            let tempuser = this.props.user;
            // let changedUser = { ...tempuser, "favorites" : [ ...tempuser.favorites, this.state.movieData]}
            for(let i=0;i<tempuser.favorites.length;i++){
                if(tempuser.favorites[i].Title === this.state.searchText){
                    tempuser.favorites.splice(i,1);
                }
            }
            this.props.userAction(tempuser);
            Axios.post('https://gentle-woodland-25742.herokuapp.com/remove',{
                "email" : "dev@gmail.com",
	            "title" : this.state.searchText
            })
        }
    }

    render() {
        console.log(this.props.user);
        let favorites = this.props.user.favorites;
        if(!this.state.heart){
            for(let i=0;i<favorites.length; i++){
                if(favorites[i].Title === this.state.movieData.Title){
                    this.setState({
                        heart : true
                    })
                }
            }
        }

        return (
            <div className="MovieContainer">
                <div className="movie-search">
                    <input type="text" placeholder="Search by Movie, Title ..." onChange={(e) => { 
                        this.getMovies(e) }}/>
                    <select onChange={(e) => this.setState({tag:e.target.value})}>
                        <option className="opt" value="t" default>Title</option>
                        {/* <option value="movie">Movie</option>
                        <option value="star">Star</option> */}
                        <option value="y">Year</option>
                    </select>
                </div>
                <div className="movie-details">
                    {this.getSingleMovie(this.state.movieData)}
                    <i className={this.state.heart ? "fas fa-heart heart" : "fal fa-heart heart"} style={this.props.user.isLoggedIn ? { color : "red"} : {display : "none"}} 
                        onClick={()=>this.selected()}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.userReducer
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        userAction
    },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer)
