import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logoutRequest} from '../auth'

export function UserSection({logout}) {
  return (
    <div>
      <p>You are already logged in</p>
      <button onClick={logout}>Log Out</button>
    </div>
  )
}

UserSection.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = function (state) {
  return {
    token: state.auth.token
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    logout: (token) => dispatch(logoutRequest({token}))
  }
}

const mergeProps = function (stateProps, dispatchProps, ownProps) {
  console.log(stateProps, dispatchProps, ownProps)
  return Object.assign({}, stateProps, dispatchProps, {
    logout: () => dispatchProps.logout(stateProps.token)
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserSection)
