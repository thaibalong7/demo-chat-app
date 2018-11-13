import React, { Component } from 'react';
import '../../App.css';
import Home from '../presentationals/Home'
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
//import { logout_user, login_user } from '../../actions';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import _ from 'lodash';
class HomeContainer extends Component {
    constructor(props) {
        console.log('Contructor HomeContainer')
        super(props)
        this.state = {
            inforChatwith: { //người đang chat hiện tại trên khung chat
                avatarUrl: '',
                displayName: '',
                uid: '',
            },
            listMessage: [], //list message hiển thị trên khung chat
            conversationID: undefined, //id của đoạn hội thoại
            listUsers: this.props.users
        }
    }
    SignOut = () => {
        const uid = this.props.auth.uid
        this.props.firebase.logout().then(() => {
            // Sign-out successful..
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
        this.props.firebase.auth().onAuthStateChanged((user) => {
            const uid = this.props.auth.uid
            if (user && typeof uid != "undefined") {
                this.props.firebase.update('users/' + user.uid, {
                    isOnline: true,
                    lastSignInTime: new Date().toString()
                })
            } else {
                // No user is signed in.
                this.props.history.push('/login');
            }
        });

        //Add listener when close window
        window.addEventListener("beforeunload", (ev) => {
            if (this.props.profile || typeof this.props.auth.uid !== "undefined") {
                // firebase.database().ref().update(updateData);
                this.props.firebase.update('users/' + this.props.auth.uid, {
                    isOnline: false,
                    lastSignInTime: new Date().toString()
                })
            }
        });
    }
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                listUsers: this.props.users
            })
        }
        if (this.props.users !== prevProps.users && this.state.inforChatwith.avatarUrl === '') {
            if (typeof this.props.users !== "undefined" && typeof this.props.profile.conversations !== "undefined") {
                var inforChatWith;
                var listMessage = [];
                for (var id in this.props.users) { //mặc định hiển thị tin nhắn với người đầu tiên danh sách
                    if (id !== this.props.auth.uid) {
                        inforChatWith = this.props.users[id];
                        inforChatWith.uid = id;

                        const conversation = this.props.profile.conversations[id]
                        if (typeof conversation !== "undefined") {
                            listMessage = this.props.conversations[conversation.conversationID];
                        }
                        this.setState({
                            inforChatwith: inforChatWith,
                            listMessage: listMessage,
                            conversationID: conversation ? conversation.conversationID : undefined
                        })
                        break;
                    }
                }
            }
            this.setState({
                listUsers: this.props.users
            })
        }
        // if (this.state.inforChatwith.uid !== '') {
        //     const conversation = this.props.profile.conversations[this.state.inforChatwith.uid]
        //     if (conversation) {
        //         listMessage = this.props.conversations[conversation.conversationID]
        //         this.setState({
        //             conversationID: conversation.conversationID,
        //             listMessage: listMessage
        //         })
        //     }
        // }
        if (this.state.conversationID !== undefined && this.props.conversations !== undefined) {
            if (this.props.conversations[this.state.conversationID] !== prevProps.conversations[this.state.conversationID]) {
                this.setState({
                    listMessage: this.props.conversations[this.state.conversationID]
                })
            }
        }
    }
    click = (uid) => {
        var listMessage = [];
        const conversation = this.props.users[this.props.auth.uid].conversations[uid];
        if (this.props.profile.conversations[uid] !== undefined) {
            listMessage = this.props.conversations[conversation.conversationID];
        }
        var inforChatWith = this.props.users[uid];
        inforChatWith.uid = uid;
        this.setState({
            inforChatwith: this.props.users[uid],
            listMessage: listMessage,
            conversationID: conversation ? conversation.conversationID : undefined
        })
    }
    sendMessage = (mess) => {
        if (mess) {
            //mess có ít nhất 1 ký tự
            if (this.state.conversationID === undefined) //chưa chat với người này bao giờ
            {
                // this.setState({
                //     conversationID: Math.random().toString(36).substr(2, 7)
                // })
                const senderID = this.props.auth.uid;
                const receiverID = this.state.inforChatwith.uid;
                const conversationID = Math.random().toString(36).substr(2, 7);
                const message = {
                    text: mess,
                    createdAt: new Date().toString(),
                    senderId: senderID
                }
                this.props.firebase.update('users/' + senderID + '/conversations/' + receiverID, {
                    conversationID: conversationID,
                    lastMessageTime: new Date().toString()
                })
                this.props.firebase.update('users/' + receiverID + '/conversations/' + senderID, {
                    conversationID: conversationID,
                    lastMessageTime: new Date().toString()
                })
                this.props.firebase.update('/conversations/' + conversationID + '/0', message)
                const listMessage = this.state.listMessage
                listMessage.push(message)
                this.setState({
                    conversationID: conversationID,
                    listMessage: listMessage
                })
            }
            else {
                //đã chat với người này rồi
                const senderID = this.props.auth.uid;
                const message = {
                    text: mess,
                    createdAt: new Date().toString(),
                    senderId: senderID
                }
                this.props.firebase.update('/conversations/' + this.state.conversationID + "/" + this.state.listMessage.length, message);
                const listMessage = this.state.listMessage
                listMessage.push(message)
                this.setState({
                    listMessage: listMessage
                })
            }
        }
    }
    search = async (value) => {
        //đặt lại danh sách listUser // this.state.listUsers
        // setTimeout(() => {
        const listUsers = {};
        _.map(this.props.users, (val, uid) => {
            if (uid !== 'undefined') {
                if (val.displayName.toLowerCase().search(value.toLowerCase()) !== -1) {
                    listUsers[uid] = val;
                }
            }
        })
        await this.setState({
            listUsers: listUsers
        })
        // }, 1000);       
    }
    render() {
        return (
            <Home SignOut={this.SignOut}
                listUser={this.state.listUsers} //để show danh sách users trong hệ thống
                profile={this.props.profile} //profile của người đang đăng nhập //để lấy avatar
                auth={this.props.auth} //thông tin chứng thực //để lấy uid của người đang đăng nhập
                conversationsID={this.state.conversationsID} //ID của đoạn chat được hiển thị trên khung chat
                inforChatwith={this.state.inforChatwith} //thông tin của người đang chat cùng //để lấy tên và avatar
                listMessage={this.state.listMessage} //mảng các tin nhắn được hiển thị trên khung chat               
                click={this.click} //khi nhấn vào một người trên khung danh sách users
                sendMessage={this.sendMessage} //khi nhấn vào nút gửi tin nhắn đi
                search={this.search} //Search theo tên
            />
        );
    }
}

export default compose(
    firebaseConnect(() => {
        const att = [];
        att.push('conversations')
        att.push('users')

        return att;
    }),
    connect(({ firebase }) => ({
        conversations: firebase.data.conversations,
        users: firebase.data.users,
        profile: firebase.profile,
        auth: firebase.auth
    }))
)(withRouter(HomeContainer));
