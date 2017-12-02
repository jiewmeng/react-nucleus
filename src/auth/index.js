import { ajax } from 'rxjs/observable/dom/ajax'
import { Observable } from 'rxjs'

const LOGIN_REQUEST = 'app/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'app/auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'app/auth/LOGIN_ERROR'
const LOGOUT_REQUEST = 'app/auth/LOGOUT_REQUEST'
const LOGOUT_SUCCESS = 'app/auth/LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'app/auth/LOGOUT_ERROR'

export const loginRequest = (payload) => ({ type: LOGIN_REQUEST, payload })
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload })
export const loginError = (payload) => ({ type: LOGIN_ERROR, payload })

const loginEpic = action$ =>
  action$.ofType(LOGIN_REQUEST)
    .mergeMap(action =>
      ajax({
        url: `${API_URL}/auth/session`,
        body: action.payload,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .map(response => loginSuccess(response))
        .catch(error => Observable.of(loginError(error)))
    )

export const logoutRequest = (payload) => ({ type: LOGOUT_REQUEST, payload })
export const logoutSuccess = (payload) => ({ type: LOGOUT_SUCCESS, payload })
export const logoutError = (payload) => ({ type: LOGOUT_ERROR, payload })

const logoutEpic = action$ =>
  action$.ofType(LOGOUT_REQUEST)
    .mergeMap(action =>
      ajax({
        url: `${API_URL}/auth/session`,
        headers: {
          Authorization: `Bearer ${action.payload.token}`
        },
        method: 'DELETE'
      })
        .map(response => logoutSuccess(response))
        .catch(error => Observable.of(logoutError(error)))
    )

export const authEpics = [
  loginEpic,
  logoutEpic
]

export default function reducer(
  state = {
    isLoggingIn: false
  },
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
        token: action.payload.response.token,
        tokenExpiry: Date.now() + action.payload.response.expiresIn,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoggingIn: false,
        loginError: {
          status: action.payload.xhr.status,
          body: action.payload.xhr.response
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
          status: action.payload.xhr.status,
          body: action.payload.xhr.data
        }
      }
    default:
      return state
  }
}
