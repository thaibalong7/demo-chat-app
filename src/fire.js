import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDKbZZ2UKCPt2xvEjbBF6vYQ1qji0_l5Vw",
    authDomain: "chat-tblong.firebaseapp.com",
    databaseURL: "https://chat-tblong.firebaseio.com",
    projectId: "chat-tblong",
    storageBucket: "chat-tblong.appspot.com",
    messagingSenderId: "392189529338"
};
var fire = firebase.initializeApp(config);
export default fire;  