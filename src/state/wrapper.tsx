import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducer';
 
const enhancer = composeWithDevTools(
  persistState()
)

const createStore = () => reduxCreateStore(rootReducer, enhancer);

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);