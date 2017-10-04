import React from 'react'
import { Link } from 'react-router-dom'

import LoginForm from '../auth/LoginForm'

export default function () {
  return (
    <div>
      <h1>Home Page</h1>

      <LoginForm />

      <Link to="/nonexistant">Non existant page</Link>
    </div>
  )
}
