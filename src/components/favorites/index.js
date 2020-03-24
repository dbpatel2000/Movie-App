import React, { Component } from 'react'
import { connect } from 'react-redux'

//import style
import './favorites.css';
import { Link } from 'react-router-dom';

class Favorites extends Component {

    getFavorites  = (data) => (
        data.map((item,key)=>(
            <div className="f-movies">
                <img src={item.Poster} alt={item.Title} className="f-img"/>
                <div className="f-gradient">
                    <div>{item.Title}({item.Year})</div>
                    <div>{item.Actors}</div>
                </div>
            </div>
        ))
    )

    
    render() {
        return (
            <div>
                <Link to="/">
                    <button className="f-back">Back</button>
                </Link>
                <div className="Favorites">
                    {this.getFavorites(this.props.user.favorites)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.userReducer
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
