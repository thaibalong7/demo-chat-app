import React, { Component } from 'react';
import '../../css/Home.css';
import LogoutButton from './LogoutButton'
import _ from 'lodash';
class Home extends Component {
    click = (uid) => {
        console.log('Chat History', uid);
    }
    renderPeopleList = () => {
        const listPeople = [];
        var key = 0;
        _.map(this.props.listUser, (value, uid) => {
            if (uid !== this.props.auth.uid && uid !== 'undefined') {
                var stateUser;
                var stateIcon;
                if (value.isOnline === false) {
                    const lastSignInTime = new Date(value.lastSignInTime);
                    const curTime = new Date();
                    var seconds = Math.floor((curTime - (lastSignInTime)) / 1000);
                    var minutes = Math.floor(seconds / 60);
                    var hours = Math.floor(minutes / 60);
                    var days = Math.floor(hours / 24);

                    hours = hours - (days * 24);
                    minutes = minutes - (days * 24 * 60) - (hours * 60);
                    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

                    if (days === 0)
                        if (hours === 0)
                            if (minutes === 0 || minutes === 1)
                                stateUser = 'left 1 minute ago' //ngày giờ là 0, phút là 0 hoặc 1
                            else
                                stateUser = 'left ' + minutes + ' minutes ago' //ngày giờ là 0, phút lớn hơn 1
                        else
                            if (hours === 1)
                                stateUser = 'left 1 hour ago' //ngày là 0, giờ là 1
                            else
                                stateUser = 'left ' + hours + ' hours ago' //ngày là 0, giờ lớn hơn 1
                    else
                        if (days === 1)
                            stateUser = 'left 1 day ago' //ngày bằng 1
                        else
                            stateUser = 'left ' + days + ' days ago' //ngày lớn hơn 1

                    stateIcon = "fa fa-circle offline";
                }
                else {
                    stateUser = 'online';
                    stateIcon = "fa fa-circle online";
                }
                listPeople.push(
                    <li onClick={() => this.click(uid)} className="people-item" key={key++}>
                        <img className="split left" src={value.avatarUrl} alt="avatar" />
                        <div className="split right">
                            <div className="name">{value.displayName}</div>
                            <div className="status">
                                <i className={stateIcon}></i> {stateUser}
                            </div>
                        </div>
                    </li>)
            }
        })
        return listPeople;
    }
    render() {
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
                            {this.renderPeopleList()}                            
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
// const mapStateToProps = (state) => ({
//     userProfile: state.userProfileReducer
// })

export default (Home);