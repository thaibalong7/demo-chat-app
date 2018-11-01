import React, { Component } from 'react';
import '../../App.css';

class Home extends Component {
    render(){
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.props.SignOut}>
                    Sign Out
			</button>
            </div>
        )
    }
}

export default Home;