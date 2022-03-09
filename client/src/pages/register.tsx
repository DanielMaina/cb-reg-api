import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../components/auth/RegisterForm'

const Register = () => {

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h1 className="text-uppercase text-left mb-4">Sign up</h1>

        <p className="member_text">
          {`Have an account? `}
          <Link to={`/login`}>
            Sign in here!
          </Link>
        </p>

        <RegisterForm />

      </div>
    </div>
  )
}

export default Register