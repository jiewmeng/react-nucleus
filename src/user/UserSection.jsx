import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Box from 'grommet/components/Box'
import Button from 'grommet/components/Button'

import {logoutRequest} from '../auth'

export function UserSection({logout}) {
  return (
    <Box pad="medium" full="horizontal">
      <p>You are already logged in</p>
      <Button label="Log out" onClick={logout} />
    </Box>
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

const mergeProps = function (stateProps, dispatchProps) {
  return Object.assign({}, stateProps, dispatchProps, {
    logout: () => dispatchProps.logout(stateProps.token)
  })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserSection)
