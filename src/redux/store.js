import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'; //middleware

import rootReducer from './root-reducer'
import {persistStore} from 'redux-persist'; //to cache the store 

const middlewares = [];

if (process.env.NODE_ENV === 'development')
 middlewares.push(logger);

export const store = createStore(rootReducer, applyMiddleware(...middlewares))
export const persistor = persistStore(store);

export default {store, persistor};