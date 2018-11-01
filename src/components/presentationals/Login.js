import React, { Component } from 'react';
import '../../App.css';

class Login extends Component {
    render(){
        return (
            <div>
                <h1>Login Page</h1>
                <button onClick={this.props.authenticate}>
                    Login with Google
			</button>
            </div>

        )
    }
}

export default Login;