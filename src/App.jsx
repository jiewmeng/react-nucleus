import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import App from 'grommet/components/App'

import store, { history } from './store'
import HomePage from './home/HomePage'
import Http404Page from './Http404Page'

export default function () {
  return (
    <App centered={false}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route component={Http404Page} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </App>
  )
}
