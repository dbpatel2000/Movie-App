import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import style
import './header.css';

// actions
import userAction from '../../actions/user_action';
import { Link } from 'react-router-dom';

class Header extends Component {
    
    render() {

        const userAuthentication = (flag) => {
            if(flag) {
                console.log('Successfully logged out!');
                const tempUser = {
                    "email" : "123ea43e",
                    "password" : "temporary",
                    "favorites" : [],
                    "isLoggedIn" : false
                }
                this.props.userAction(tempUser);
            }

            else{
                console.log('Succesfully logged in!');
                let getAuth = this.props.getAuthPage;
                getAuth();
                // this.props.userAction({ ...this.props.user, "isLoggedIn" : true})   
            }
        }

        return (
            <div className="Header">
                <div className="h-wrapper container">
                    <span className="h-logotext">
                        <i className="far fa-bars i-display"
                            // onClick={()=>this.props.showNav}
                        />
                        MOVIES
                    </span>
                    <div className="h-menu">
                        <Link to="/favorites">
                            <i className="fas fa-star favorite" style={!this.props.user.isLoggedIn ? { display : "none"} : {}}/>
                        </Link>
                        <button className="h-m-login"
                            onClick={()=>userAuthentication(this.props.user.isLoggedIn)}
                        >{this.props.user.isLoggedIn ? "LOGOUT" : "LOGIN / REGISTER"}</button>
                    </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Header);
