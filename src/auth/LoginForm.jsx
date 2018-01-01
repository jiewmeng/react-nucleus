import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import validator from 'validator'
import { Link } from 'react-router-dom'
import GrommetLoginForm from 'grommet/components/LoginForm'
import Box from 'grommet/components/Box'

import {loginRequest} from './index'

export class LoginForm extends React.Component {
  constructor(params) {
    super(params)

    this.state = {
      errors: []
    }

    this.validateForm = this.validateForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateForm(params) {
    const errors = []

    if (validator.isEmpty(params.username)) {
      errors.push('Username is required')
    }

    if (validator.isEmpty(params.password)) {
      errors.push('Password is required')
    }

    this.setState({
      errors
    })
  }

  handleSubmit(params) {
    this.validateForm(params)
    if (Object.keys(this.state.errors).length === 0) {
      this.props.loginRequest({
        username: params.username,
        password: params.password
      })
    }
    event.preventDefault()
  }

  render() {
    return (
      <Box appCentered align="center">
        <GrommetLoginForm
          title="Login"
          secondaryText="React Nucleus"
          forgotPassword={<Link to="/auth/forgot-password">Forgot Password</Link>}
          onSubmit={this.props.isLoggingIn ? undefined : this.handleSubmit}
          errors={this.state.errors.concat(this.props.loginError)} />
      </Box>
    )
  }
}

LoginForm.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  loginRequest: PropTypes.func.isRequired,
  loginError: PropTypes.array.isRequired
}

const mapStateToProps = function (state) {
  let loginError = ''
  if (state.auth.loginError) {
    loginError = [state.auth.loginError.body.error]
    if (state.auth.loginError.body.details) {
      loginError = Object.values(state.auth.loginError.body.details)
    }
  }
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    loginRequest: (params) => dispatch(loginRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
