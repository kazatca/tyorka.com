import { combineReducers } from 'redux';
import cart from './cart';
import checkout from './checkout';
import app from './app';

const rootReducer = combineReducers({ cart, checkout, app });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>