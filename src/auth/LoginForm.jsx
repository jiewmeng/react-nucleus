import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import validator from 'validator'

import {loginRequest} from './index'

export class LoginForm extends React.Component {
  constructor(params) {
    super(params)

    this.state = {
      username: '',
      password: '',
      usernameError: '',
      passwordError: ''
    }
  }

  handleChange(field, event) {
    const value = event.target.value

    // some simple validation
    this.validateField(field, value)

    this.setState({
      [field]: value
    })
  }

  validateField(field, value) {
    switch (field) {
      case 'username':
        if (validator.isEmpty(value)) {
          this.setState({
            usernameError: 'Username is required'
          })
        } else {
          this.setState({
            usernameError: undefined
          })
        }
        break
      case 'password':
        if (validator.isEmpty(value)) {
          this.setState({
            passwordError: 'Password is required'
          })
        } else {
          this.setState({
            passwordError: undefined
          })
        }
        break
      default:
        // noop
    }
  }

  handleSubmit(event) {
    this.props.loginRequest({
      username: this.state.username,
      password: this.state.password
    })
    event.preventDefault()
  }

  render() {
    const loginError = this.props.loginError
    const generalError = loginError ?
      <div className="error">{loginError.body.error}</div> :
      ''

    const isLoginDisabled = Boolean(
      this.props.isLoggingIn ||
      this.state.usernameError ||
      this.state.passwordError
    )

    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <h2>An Example Login Form</h2>

        {generalError}

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange.bind(this, 'username')}
          />

          {this.state.usernameError &&
            <span className="error">{this.state.usernameError}</span>
          }
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')}
          />

          {this.state.passwordError &&
            <span className="error">{this.state.passwordError}</span>
          }
        </div>

        <input
          type="submit"
          value="Login"
          disabled={isLoginDisabled}
        />
      </form>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool,
  loginRequest: PropTypes.func.isRequired,
  loginError: PropTypes.object
}

LoginForm.defaultProps = {
  isLoggingIn: false,
  loginError: null
}

const mapStateToProps = function (state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    loginRequest: (params) => dispatch(loginRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
