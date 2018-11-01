import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../src/reducers';

const logger = createLogger(); //middleware để log ra priviousState và nextState mỗi khi có action

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
