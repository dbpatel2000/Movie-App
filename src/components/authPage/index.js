import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import style
import './auth.css';
import { firebaseAuth } from '../../config';
import userAction from '../../actions/user_action';
import Axios from 'axios';

class Auth extends Component {

    state = {
        "email" : "",
        "password" : "",
        "error" : "",
        "success" :"",
        "authState" : false,
    }
    
    render() {

        if(this.props.authState && !this.state.authState){
            this.setState({authState:true,error:"", success:""});
        }

        const setLogin = () => {
            let email = this.state.email;
            let pass = this.state.password;
            firebaseAuth.signInWithEmailAndPassword(email,pass)
            .then( ()=> {
                Axios.get(`https://gentle-woodland-25742.herokuapp.com/${email}`) 
                .then(result => {
                    const tempUser = {
                        "email" : email,
                        "password" : pass,
                        "favorites" : result.data,
                        "isLoggedIn" : true
                    }
                    this.props.userAction(tempUser)
                    this.setState({authState : false})
                    this.props.setAuthState()
                })
                .catch(err => console.log(err));
                // const tempUser = {
                //     "email" : email,
                //     "password" : pass,
                //     "favorites" : [],
                //     "isLoggedIn" : true
                // }
                // this.props.userAction(tempUser)
                // this.setState({authState : false})
                // this.props.setAuthState()
            })
            .catch( err => this.setState({error:"Unsuccessfull Login!", success:""}))
        }

        const setRegister =() => {
            let email = this.state.email;
            let pass = this.state.password;
            firebaseAuth.createUserWithEmailAndPassword(email,pass)
            .then( ()=> {
                this.setState({success : "Registration sucessfull!", error:""})
                Axios.post(`https://gentle-woodland-25742.herokuapp.com/`,{
                    "email" : email,
                    "password" : pass
                })
                .then(()=> console.log('Successfull added to mongodb'))
                .catch( err => console.log(err))
            })
            .catch( err => this.setState({error:"Unsuccessfull Registration!", success:""}))
        }

        return (
            <div className="Auth">
                <div className="auth-page">
                    <button className="cancel-auth"
                        onClick={()=> {                            
                            this.setState({authState : false})
                            this.props.setAuthState()
                        }}
                    >X</button>
                    <span>Authentication</span>
                    <div className="auth-form">
                        <input type="text" placeholder="Email" className="form-input" onChange={(e) => this.setState({email:e.target.value})}/>
                        <input type="password" placeholder="Password" className="form-input" onChange={(e) => this.setState({password:e.target.value})}/>
                        <div className="auth-success">{this.state.success}</div>
                        <div className="auth-error">{this.state.error}</div>
                        <div className="auth-button">
                            <button className="f-login"
                                onClick={()=> setLogin()}
                            >Login</button>
                            <button className="f-register"
                                onClick={()=>setRegister()}
                            >Register</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        userAction
    },dispatch)
}


export default connect(null,mapDispatchToProps)(Auth);