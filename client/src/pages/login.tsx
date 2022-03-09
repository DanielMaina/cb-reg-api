import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPass from '../components/auth/LoginPass'
import LoginSMS from '../components/auth/LoginSMS'
import SocialLogin from '../components/auth/SocialLogin'

import { RootStore } from '../utils/Typescript'

const Login = () => {
  const [sms, setSms] = useState(false)
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if(auth.access_token) navigate('/')
  },[auth.access_token, navigate])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h1 className="text-uppercase text-left mb-4">Sign in</h1>
        <p className="member_text">
          {`Not a member yet? `}
          <Link to={`/register`}>
            Sign up here!
          </Link>
        </p>

        <SocialLogin />

        <div className="h6_custom"> OR </div>

        { sms ? <LoginSMS/> : <LoginPass /> }

        <div className="row my-2 mt-3">
        <span className="col-6" onClick={() => setSms(!sms)}>
            { sms ? 'Sign in with password' : 'Sign in with SMS' }
          </span>

          <span className="col-6 text-end">
            <Link to='/forgot_password'>
              Forgot password?
            </Link>
          </span>
        </div>

      </div>
    </div>
  )
}

export default Login
