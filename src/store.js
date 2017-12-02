import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import {createEpicMiddleware} from 'redux-observable'

import appReducer from './reducer'
import appEpics from './epics'

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)
const epicsMiddleware = createEpicMiddleware(appEpics)

export default createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(
      epicsMiddleware,
      historyMiddleware
    )
  )
)

if (module.hot) {
  module.hot.accept('./epics', () => {
    // eslint-disable-next-line
    const rootEpic = require('./epics').default
    epicsMiddleware.replaceEpic(rootEpic)
  })
}
