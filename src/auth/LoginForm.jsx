import React from 'react'
import validator from 'validator'

export default class LoginForm extends React.Component {
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

  render() {
    return (
      <form>
        <h2>An Example Login Form</h2>
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

        <input type="submit" value="Login" />
      </form>
    )
  }
}
