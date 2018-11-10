import React, { Component } from 'react';
import '../../App.css';
import Login from '../presentationals/Login'
//import { login_user } from '../../actions'
import { withFirebase } from 'react-redux-firebase'

class LoginContainer extends Component {
    componentDidMount() {
        console.log('login container props',this.props)
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push('/home');
            }
        });
    }
    authenticate = () => {
        this.props.firebase.login({
            provider: 'google',
            type: 'popup',
            // scopes: ['email'] // not required
        }).then((result)=>{
            if (result.additionalUserInfo.isNewUser === true) {
                console.log('This is new user ...')
                //do something
            }
        }).catch((err) =>{
            
        })
    }
    render() {
        return (
            <Login authenticate={this.authenticate} />
        );
    }
}
export default withFirebase(LoginContainer);