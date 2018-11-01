import React, { Component } from 'react';
import '../../App.css';
import GoogleButton from 'react-google-button'


class Login extends Component {
    render(){
        return (
            <div className="container-fluid">
                <h1>Login Page</h1>
                <GoogleButton onClick={this.props.authenticate}>
                    Login with Google
			    </GoogleButton>
            </div>

        )
    }
}

export default Login;