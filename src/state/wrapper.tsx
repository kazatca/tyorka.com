import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducer';

const createStore = () => reduxCreateStore(rootReducer, devToolsEnhancer({}));

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);