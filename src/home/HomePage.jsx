import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import LoginForm from '../auth/LoginForm'
import UserSection from '../user/UserSection'

export function HomePage({isLoggedIn}) {
  const authSection = isLoggedIn ?
    <UserSection /> :
    <LoginForm />

  return (
    <div>
      <h1>Home Page</h1>

      {authSection}

      <Link to="/nonexistant">Non existant page</Link>
    </div>
  )
}

HomePage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

const mapStateToProps = function (state) {
  return {
    isLoggedIn: Boolean(state.auth.token && state.auth.tokenExpiry > Date.now())
  }
}

const mapDispatchToProps = function () {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
