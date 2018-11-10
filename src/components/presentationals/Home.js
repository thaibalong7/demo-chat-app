import React, { Component } from 'react';
import '../../css/Home.css';
import LogoutButton from './LogoutButton';
import ReactDOM from 'react-dom';
import _ from 'lodash';


function RightMess(props) {
    return (<li className="clearfix" key={props.key}>
        <div className="message-data align-right">
            <span className="message-data-time" >{props.time}</span> &nbsp; &nbsp;
        <span className="message-data-name" >{props.name}</span>
            <i className="fa fa-circle me"></i>
        </div>
        <div className="message other-message float-right">
            {props.text}
        </div>
    </li>)
}
function LeftMess(props) {
    return (<li key={props.key}>
        <div className="message-data">
            <span className="message-data-name"><i className="fa fa-circle online"></i> {props.name}</span>
            <span className="message-data-time">{props.time}</span>
        </div>
        <div className="message my-message">
            {props.text}
        </div>
    </li>)
}
class Home extends Component {
    constructor(props) {
        console.log('Contructor Home')
        super(props)
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.state = {
            messageToSend: '',
            search: ''
        }
    }
    scrollToBottom = () => {
        const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };
    onChangeMess = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }
    onChangeSearch = (e) => {
        let target = e.target;
        let value = target.value;
        this.setState({
            search: value
        });
        this.props.search(value);
    }
    componentDidMount() {
        this.scrollToBottom();
    }
    componentDidUpdate(prevProps) {
        this.scrollToBottom();
    }
    onSend = () => {
        if (this.state.messageToSend !== '') {
            this.setState({
                messageToSend: ''
            })
            this.props.sendMessage(this.state.messageToSend)
        }
    }
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSend();
        }
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
                    <li onClick={() => this.props.click(uid)} className="people-item" key={key++}>
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
    renderMessage = () => {
        const messList = [];
        var key = 0;
        this.props.listMessage.map((val, i) => {
            if (val.senderId === this.props.auth.uid) //nguười đăng nhập là người gởi
                messList.push(<RightMess time={val.createdAt.toString()}
                    name={this.props.profile.displayName}
                    text={val.text}
                    key={key++}>
                </RightMess>)
            else
                messList.push(<LeftMess time={val.createdAt.toString()}
                    name={this.props.inforChatwith.displayName}
                    text={val.text}
                    key={key++}>
                </LeftMess>)
            return 0;
        })
        return messList;
    }
    render() {
        var chatWith = 'Chat with ' + this.props.inforChatwith.displayName
        return (
            <div>
                <LogoutButton logoutClick={this.props.SignOut}></LogoutButton>
                <div className="container clearfix">
                    <div className="people-list" id="people-list">
                        <div className="search">
                            <input type="text" placeholder="search" value={this.state.search} onChange={this.onChangeSearch} />
                            <i className="fa fa-search"></i>
                        </div>
                        <ul className="list">
                            {this.renderPeopleList()}
                        </ul>
                    </div>
                    <div className="chat">
                        <div className="chat-header clearfix">
                            <img src={this.props.inforChatwith.avatarUrl} alt="avatar" />
                            <div className="chat-about">
                                <div className="chat-with">{chatWith}</div>
                                <div className="chat-num-messages">already 1 902 messages</div>
                            </div>
                            <i className="fa fa-star"></i>
                        </div>
                        {/* <!-- end chat-header --> */}
                        <div className="chat-history" ref={(el) => { this.messagesContainer = el; }} >
                            <ul>
                                {this.renderMessage()}
                            </ul>
                        </div>
                        {/* <!-- end chat-history --> */}
                        <div className="chat-message clearfix">
                            <textarea name="messageToSend" id="messageToSend"
                                placeholder="Type your message" rows="3"
                                onChange={this.onChangeMess}
                                value={this.state.messageToSend}
                                onKeyPress={this.handleKeyPress} ></textarea>
                            <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                            <i className="fa fa-file-image-o"></i>
                            <button onClick={this.onSend}>Send</button>
                        </div>
                        {/* <!-- end chat-message --> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default (Home);