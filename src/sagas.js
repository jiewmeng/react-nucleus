import {all} from 'redux-saga/effects'
import {authSagas} from './auth'

export default function* appSaga() {
  yield all([
    authSagas()
  ])
}
