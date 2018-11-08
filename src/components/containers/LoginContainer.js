import React, { Component } from 'react';
import '../../App.css';
import firebaseApp from '../../fire'
import Login from '../presentationals/Login'
import { connect } from 'react-redux'
//import { login_user } from '../../actions'
import { withFirebase } from 'react-redux-firebase'

class LoginContainer extends Component {
    componentDidMount() {
        console.log(this.props)
        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                // const userInfo = {
                //     displayName: user.displayName,
                //     email: user.email,
                //     photoURL: user.photoURL,
                //     phoneNumber: user.phoneNumber,
                //     creationTime: user.metadata.creationTime,
                //     uid: user.uid
                // }
                // this.props.login_user(userInfo);
                this.props.history.push('/home');
            }
        });
    }
    authenticate = () => {
        // var provider = new firebase.auth.GoogleAuthProvider();
        // provider.addScope('profile');
        // provider.addScope('email');

        // firebaseApp.auth().signInWithPopup(provider)
        //     .then(result => {
        //         console.log('authenticate', result);
        //         if (result.additionalUserInfo.isNewUser === true) {
        //             console.log('Create new user');
        //             firebase.database().ref('user/' + result.user.uid).set({
        //                 displayName: result.user.displayName,
        //                 photoURL: result.user.photoURL,
        //                 lastSignInTime: new Date().toLocaleString(),
        //                 email: result.user.email,
        //                 isOnline: true,
        //             })
        //         }
        //     }).catch(function (error) {
        //         // Handle Errors here.
        //         var errorCode = error.code;
        //         var errorMessage = error.message;
        //         // The email of the user's account used.
        //         var email = error.email;
        //         // The firebase.auth.AuthCredential type that was used.
        //         var credential = error.credential;
        //         // ...
        //     });

        this.props.firebase.login({
            provider: 'google',
            type: 'popup',
            // scopes: ['email'] // not required
        }).then(()=>{
            console.log('asasdasd');
        }).catch((err) =>{
            
        })

    }

    render() {
        return (
            <Login authenticate={this.authenticate} />
        );
    }
}

// const mapDispatchToProps = (dispatch) => (
//     {
//         login_user: (info) => {
//             dispatch(login_user(info));
//         },
//     }
// )

//export default connect(null, mapDispatchToProps)(LoginContainer);
export default withFirebase(LoginContainer);