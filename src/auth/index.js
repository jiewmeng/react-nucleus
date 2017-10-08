import { call, put, takeLatest, all } from 'redux-saga/effects'
import {
  login,
  logout
} from './api'

const LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'app/auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'app/auth/LOGIN_ERROR'
const LOGOUT_REQUEST = 'app/auth/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'app/auth/LOGOUT_ERROR'

export function loginRequest(payload) {
  return {
    type: LOGIN_REQUEST,
    payload
  }
}

export function* doLogin(action) {
  try {
    const payload = yield call(login, action.payload)

    const {token, expiresIn} = payload.data
    localStorage.setItem('token', token)
    localStorage.setItem('tokenExpiry', Date.now() + expiresIn)
    yield put({type: LOGIN_SUCCESS, payload: {token, expiresIn}})
  } catch (error) {
    yield put({type: LOGIN_ERROR, error})
  }
}

export function logoutRequest(payload) {
  return {
    type: LOGOUT_REQUEST,
    payload
  }
}


export function* doLogout(action) {
  try {
    yield call(logout, action.payload)

    localStorage.clear()
    yield put({type: LOGOUT_SUCCESS})
  } catch (error) {
    yield put({type: LOGOUT_ERROR, error})
  }
}

export function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, doLogin)
}

export function* watchLogoutRequest() {
  yield takeLatest(LOGOUT_REQUEST, doLogout)
}

export function* authSagas() {
  yield all([
    watchLoginRequest(),
    watchLogoutRequest()
  ])
}

export default function reducer(
  state = {},
  action = {
    type: '',
    payload: {},
    error: undefined
  }
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        token: action.payload.token,
        tokenExpiry: Date.now() + action.payload.expiresIn,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        loginError: {
          status: action.error.response.status,
          body: action.error.response.data
        }
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        token: undefined,
        tokenExpiry: undefined
      }
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: {
          status: action.error.response.status,
          body: action.error.response.data
        }
      }
    default:
      return state
  }
}
