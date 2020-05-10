import React from 'react';
import { Provider } from 'react-redux';
import { createStore as reduxCreateStore, StoreEnhancer } from 'redux';
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootReducer from './reducer';

const enhancer = (
  typeof window !== 'undefined' 
  ? composeWithDevTools(
    // @ts-ignore
    persistState()
  )
  : undefined
);

const createStore = () => reduxCreateStore(rootReducer, enhancer);

interface Props {
  element: React.ReactNode
}

const Root: React.FC<Props> = ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);

export default Root;