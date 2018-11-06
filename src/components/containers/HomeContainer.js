import React, { Component } from 'react';
import '../../App.css';
import Home from '../presentationals/Home'
import * as firebase from 'firebase';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logout_user, login_user } from '../../actions';
import _ from 'lodash';
class HomeContainer extends Component {
    SignOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful..
            console.log('sign out successful');
            //Change state online in DB //false
            var updateData = {};
            updateData['user/' + this.props.userProfile.uid + '/isOnline'] = false;
            updateData['user/' + this.props.userProfile.uid + '/lastSignInTime'] = new Date().toLocaleString();
            firebase.database().ref().update(updateData);

            this.props.logout_user();
            this.props.history.push('/login')
        }).catch(function (error) {
            // An error happened.
        });

    }
    componentDidMount() {
        //Authenticate user
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
                this.props.login_user(userInfo); //Change state userProfile of redux
                //Change state online in DB //true
                var updateData = {};
                updateData['user/' + user.uid + '/isOnline'] = true;
                updateData['user/' + user.uid + '/lastSignInTime'] = new Date().toLocaleString();
                firebase.database().ref().update(updateData);
            } else {
                // No user is signed in.
                this.props.history.push('/login');
            }
        });

        //Get data of all user in system
        firebase.database().ref('user').on('value', function (snapshot) {
            console.log(snapshot.val());
            _.map(snapshot.val(), function (value, uid) {
                console.log(value, uid);
            })
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        })

        //Add listener when close window
        window.addEventListener("beforeunload", (ev) => {
            if (this.props.userProfile || this.props.userProfile.uid !== undefined) {
                var updateData = {};
                updateData['user/' + this.props.userProfile.uid + '/isOnline'] = false;
                updateData['user/' + this.props.userProfile.uid + '/lastSignInTime'] = new Date().toLocaleString();

                firebase.database().ref().update(updateData);
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
const mapStateToProps = (state) => ({
    userProfile: state.userProfileReducer
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeContainer));
