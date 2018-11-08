import React, { Component } from 'react';
import '../../App.css';
import Home from '../presentationals/Home'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
//import { logout_user, login_user } from '../../actions';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
class HomeContainer extends Component {
    SignOut = () => {
        const uid = this.props.auth.uid
        this.props.firebase.logout().then(() => {
            // Sign-out successful..

            //Change state online in DB //false
            // var updateData = {};
            // updateData['users/' + this.props.userProfile.uid + '/isOnline'] = false;
            // updateData['users/' + this.props.userProfile.uid + '/lastSignInTime'] = new Date().toLocaleString();
            // firebase.database().ref().update(updateData);
            this.props.firebase.update('users/' + uid, {
                isOnline: false,
                lastSignInTime: new Date().toString()
            })

            console.log('sign out successful');
            //this.props.logout_user();
            this.props.history.push('/login')
        }).catch(function (error) {
            // An error happened.
        });

    }
    componentDidMount() {
        //Authenticate user
        const uid = this.props.auth.uid
        this.props.firebase.auth().onAuthStateChanged((user) => {
            if (user && typeof uid != "undefined") {
                // User is signed in.
                // const userInfo = {
                //     displayName: user.displayName,
                //     email: user.email,
                //     photoURL: user.photoURL,
                //     phoneNumber: user.phoneNumber,
                //     creationTime: user.metadata.creationTime,
                //     uid: user.uid
                // }
                //this.props.login_user(userInfo); //Change state userProfile of redux
                //Change state online in DB //true
                // var updateData = {};
                // updateData['users/' + user.uid + '/isOnline'] = true;
                // updateData['users/' + user.uid + '/lastSignInTime'] = new Date().toLocaleString();
                // firebase.database().ref().update(updateData);
                this.props.firebase.update('users/' + uid, {
                    isOnline: true,
                    lastSignInTime: new Date().toString()
                })
            } else {
                // No user is signed in.
                this.props.history.push('/login');
            }
        });

        //Get data of all user in system
        // firebase.database().ref('users').on('value', function (snapshot) {
        //     console.log(snapshot.val());
        //     _.map(snapshot.val(), function (value, uid) {
        //         console.log(value, uid);
        //     })
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);
        // })

        //Add listener when close window
        window.addEventListener("beforeunload", (ev) => {
            if (this.props.profile || typeof this.props.auth.uid !== "undefined") {
                // var updateData = {};
                // updateData['users/' + this.props.userProfile.uid + '/isOnline'] = false;
                // updateData['users/' + this.props.userProfile.uid + '/lastSignInTime'] = new Date().toLocaleString();

                // firebase.database().ref().update(updateData);
                this.props.firebase.update('users/' + this.props.auth.uid, {
                    isOnline: false,
                    lastSignInTime: new Date().toString()
                })
            }
        });
    }
    render() {
        return (
            <Home SignOut={this.SignOut} listUser={this.props.users} profile={this.props.profile} auth={this.props.auth} />
        );
    }
}

// const mapDispatchToProps = (dispatch) => (
//     {
//         login_user: (info) => {
//             dispatch(login_user(info));
//         },
//         logout_user: () => {
//             dispatch(logout_user());
//         },
//     }
// )
// const mapStateToProps = (state) => ({
//     userProfile: state.userProfileReducer
// })



export default compose(
    firebaseConnect((props) => [
        { path: 'users' } // string equivalent 'todos'
    ]),
    connect((state, props) => ({
        users: state.firebase.data.users,
        profile: state.firebase.profile,
        auth: state.firebase.auth
    }))
)(withRouter(HomeContainer));
