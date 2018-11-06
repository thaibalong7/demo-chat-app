import React, { Component } from 'react';
import '../../css/LogoutButton.css';
//import { connect } from 'react-redux'

class PeopleListContainer extends Component {
    render() {
        return (
            <div className="people-list" id="people-list">
                <div className="search">
                    <input type="text" placeholder="search" />
                    <i className="fa fa-search"></i>
                </div>
                <ul className="list">
                    <li onClick={this.click} className="people-item">
                        <img className="split left" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
                        <div className="split right">
                            <div className="name">Vincent Porter</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                        </div>
                        </div>
                    </li>
                    <li onClick={this.click} className="people-item">
                        <img className="split left" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_05.jpg" alt="avatar" />
                        <div className="split right">
                            <div className="name">Ginger</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> online
                        </div>
                        </div>
                    </li>
                    <li onClick={this.click} className="people-item">
                        <img className="split left" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_07.jpg" alt="avatar" />
                        <div className="split right">
                            <div className="name">Christian Kelly</div>
                            <div className="status">
                                <i className="fa fa-circle offline"></i> left 10 hours ago
                        </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}


export default (PeopleListContainer);