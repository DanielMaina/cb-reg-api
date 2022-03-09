import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { FormSubmit } from '../../utils/Typescript'
import { loginSMS } from '../../redux/actions/authAction'

const LoginSMS = () => {
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(loginSMS(phone))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="phone" className="form-label">Phone number</label>

        <input type="text" className="form-control" id="phone"
        value={phone} onChange={e => setPhone(e.target.value)}
        placeholder="Phone number format: +14375551936"
        autoComplete="on" />
      </div>

      <button type="submit" className="btn btn-danger w-100"
      disabled={phone ? false : true}>
        Sign In
      </button>
    </form>
  )
}

export default LoginSMS