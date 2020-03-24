import React, { Component } from 'react'
import { connect } from 'react-redux'

//import style
import './app.css';
import Header from '../components/header';
import Auth from '../components/authPage';
import MovieContainer from '../components/moviecontainer';
import { Switch, Route } from 'react-router-dom';
import Favorites from '../components/favorites';

class App extends Component {
    
    state = {
        showAuth : false,
    }

    getAuthPage = () => {
        this.setState({
            showAuth : true
        })
    }

    render() {
        // console.log(this.props.user);
        return (
            <div className="App">
                <Header className="app-header"
                    getAuthPage={this.getAuthPage}
                />
                <div className="app-auth" style={this.state.showAuth ? {display: "grid"} : {display:"none"}}>
                    <Auth
                        setAuthState={()=> this.setState({showAuth:false})}
                        authState={this.state.showAuth}
                    />
                </div>
                <div className="container mt-5 pl-2 pr-2">
                    <Switch>
                        <Route path="/" exact component={MovieContainer}/>
                        <Route path="/favorites" exact component={Favorites}/>
                    </Switch>
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


export default connect(mapStateToProps,mapDispatchToProps)(App);
