import { combineReducers } from 'redux';
import userProfileReducer from './userProfileReducer';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
    userProfileReducer: userProfileReducer,
    firebase: firebaseReducer
})