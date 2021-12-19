import { combineReducers } from 'redux';
import cart from './cart';
import checkout from './checkout';

const rootReducer = combineReducers({ cart, checkout });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>