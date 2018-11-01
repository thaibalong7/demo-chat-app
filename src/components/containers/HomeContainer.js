import React, { Component } from 'react';
import '../../App.css';
import Home from '../presentationals/Home'
import * as firebase from 'firebase';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { logout_user, login_user } from '../../actions'
class HomeContainer extends Component {
    SignOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful..
            console.log('sign out successful');
            this.props.logout_user();
            this.props.history.push('/login')
        }).catch(function (error) {
            // An error happened.
        });

    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                const userInfo = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    creationTime: user.metadata.creationTime,
                    uid: user.uid
                }
                this.props.login_user(userInfo);
            } else {
                // No user is signed in.
                this.props.history.push('/login');
            }
        });
    }
    render() {
        return (
            <Home SignOut={this.SignOut} />
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        login_user: (info) => {
            dispatch(login_user(info));
        },
        logout_user: () => {
            dispatch(logout_user());
        },
    }
)
export default connect(null, mapDispatchToProps)(withRouter(HomeContainer));
