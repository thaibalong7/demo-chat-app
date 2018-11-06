import React, { Component } from 'react';
import '../../css/Home.css';
import { connect } from 'react-redux'
import LogoutButton from './LogoutButton'

class Home extends Component {
    click() {
        console.log('click');
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <LogoutButton logoutClick={this.props.SignOut}></LogoutButton>
                <div className="container clearfix">
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
                    <div className="chat">
                        <div className="chat-header clearfix">
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                            <div className="chat-about">
                                <div className="chat-with">Chat with Vincent Porter</div>
                                <div className="chat-num-messages">already 1 902 messages</div>
                            </div>
                            <i className="fa fa-star"></i>
                        </div>
                        {/* <!-- end chat-header --> */}
                        <div className="chat-history">
                            <ul>
                                <li className="clearfix">
                                    <div className="message-data align-right">
                                        <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                                        <span className="message-data-name" >Olia</span>
                                        <i className="fa fa-circle me"></i>
                                    </div>
                                    <div className="message other-message float-right">
                                        Hi Vincent, how are you? How is the project coming along?
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                                <li>
                                    <div className="message-data">
                                        <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">
                                        Are we meeting today? Project has been already finished and I have results to show you.
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* <!-- end chat-history --> */}
                        <div className="chat-message clearfix">
                            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
                            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-file-image-o"></i>
                            <button>Send</button>
                        </div>
                        {/* <!-- end chat-message --> */}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    userProfile: state.userProfileReducer
})

export default connect(mapStateToProps, null)(Home);