import React, { createContext } from 'react'
import { Provider } from 'react-redux'
import { createStore as reduxCreateStore } from 'redux'
import persistState from 'redux-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import { rootReducer } from './reducer'
import config from '../../config.json'
import { Config } from '../interfaces'

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

export interface Context {
  config: Config
}

export const Ctx = createContext<Context>(ctx)

interface Props {
  element: React.ReactNode
}

const Root: React.FC<Props> = ({ element }) => (
  <Ctx.Provider value={ctx}>
    <Provider store={createStore()}>{element}</Provider>
  </Ctx.Provider>
)

export default Root
