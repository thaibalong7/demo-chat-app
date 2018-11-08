import {createStore, compose } from 'redux';
//import {createLogger} from 'redux-logger';
import rootReducer from '../src/reducers';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from './fire'

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  profileFactory: (userData, profileData) => { // how profiles are stored in database
    //console.log(userData, profileData);
    //const { user } = userData
    profileData.isOnline = true;
    profileData.lastSignInTime = new Date().toLocaleString();
    return profileData;
  }
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// const logger = createLogger(); //middleware để log ra priviousState và nextState mỗi khi có action

// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export function configureStore(initialState) {
  return createStoreWithFirebase(rootReducer, initialState)
}
