import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { InputChange, FormSubmit } from '../../utils/Typescript'
import { login } from '../../redux/actions/authAction'
import eye from '../../assets/icons/eye.svg'
import eyeClosed from '../../assets/icons/eye-slash.svg'


const LoginPass = () => {
    const initialState = { account: '', password: '' }
    const [userLogin, setUserLogin] = useState(initialState)
    const { account, password } = userLogin
  
    const [typePass, setTypePass] = useState(false)
  
    const dispatch = useDispatch()
  
    const handleChangeInput = (e: InputChange) => {
      const {value, name} = e.target
      setUserLogin({...userLogin, [name]:value})
    }
  
    const handleSubmit = (e: FormSubmit) => {
      e.preventDefault()
      dispatch(login(userLogin))
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="account" className="form-label">
            Email
          </label>
  
          <input type="text" className="form-control" id="account"
          name="account" value={account} onChange={handleChangeInput}
          placeholder="Enter your email" 
          autoComplete="on" />
        </div>
  
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">Password</label>
  
          <div className="password-input">
            <input type={typePass ? "text" : "password"} 
            className="form-control" 
            id="password"
            name="password" value={password} 
            onChange={handleChangeInput} 
            placeholder="Enter your password"
            autoComplete="current-password"
            />
  
            <div onClick={() => setTypePass(!typePass)} className="img-container">
              <img src={typePass ? eye : eyeClosed } alt={typePass ? 'hide icon' : 'show icon'} className="pres-icon form-icon" />
            </div>
          </div>
        </div>
  
        <button type="submit" className="btn solid-btn w-100 mt-4"
        disabled={(account && password) ? false : true}>
          Sign In
        </button>
      </form>
    )
  }
  
  export default LoginPass
