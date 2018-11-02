import React, { Component } from 'react';
import '../../css/LogoutButton.css';
import { connect } from 'react-redux'

class LoginButton extends Component {
    render(){
        return(
            <div className="navigation" onClick={this.props.logoutClick}>
                <span className="buttonLogout">
                    <img src={this.props.userProfile.photoURL} alt="avatar"/>
                    <div className="logout">LOGOUT</div>
                </span>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    userProfile: state.userProfileReducer
})

export default connect(mapStateToProps, null)(LoginButton);