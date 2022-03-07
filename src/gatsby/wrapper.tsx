import React, { createContext } from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { ApolloProvider } from '@apollo/client'
import { rootReducer } from '../state/reducer'
import config from '../../config.json'
import { createApolloClient } from '../lib/apollo'

const enhancer =
  typeof window !== 'undefined'
    ? composeWithDevTools(
        // @ts-ignore
        persistState()
      )
    : undefined

const createStore = () => reduxCreateStore(rootReducer, enhancer)

const ctx = {
  config,
}

export type Context = typeof ctx

export const Ctx = createContext<Context>(ctx)

export const Root: React.FC = ({ children }) => (
  <ApolloProvider client={createApolloClient(config.shop.url)}>
    <Ctx.Provider value={ctx}>
      <Provider store={createStore()}>{children}</Provider>
    </Ctx.Provider>
  </ApolloProvider>
)
