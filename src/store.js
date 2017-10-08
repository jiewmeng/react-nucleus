import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import appReducer from './reducer'
import appSaga from './sagas'

export const history = createHistory()

const historyMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

export default createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(
      sagaMiddleware,
      historyMiddleware
    )
  )
)

sagaMiddleware.run(appSaga)
