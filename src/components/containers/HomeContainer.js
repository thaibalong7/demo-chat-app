import React, { Component } from 'react';
import '../../App.css';
import Home from '../presentationals/Home'
import * as firebase from 'firebase';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { logout_user } from '../../actions'

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
    render() {
        console.log(this.props);
        return (
            <Home SignOut={this.SignOut}/>
        );
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        logout_user: () => {
            dispatch(logout_user());
        },
    }
)
export default connect(null, mapDispatchToProps)(withRouter(HomeContainer));
