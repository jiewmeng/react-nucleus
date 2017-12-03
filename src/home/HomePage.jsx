import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Header from 'grommet/components/Header'
import Box from 'grommet/components/Box'
import Article from 'grommet/components/Article'
import Title from 'grommet/components/Title'

import LoginForm from '../auth/LoginForm'
import UserSection from '../user/UserSection'

export function HomePage({isLoggedIn}) {
  const authSection = isLoggedIn ?
    <UserSection /> :
    <LoginForm />

  return (
    <Article>
      <Header fixed pad="medium" separator="bottom">
        <Box full="horizontal">
          <Title>
            React Nucleus
          </Title>
        </Box>
      </Header>

      {authSection}
    </Article>
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
