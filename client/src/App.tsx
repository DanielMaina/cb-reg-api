import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PageRender from './PageRender'
import Header from './components/global/Header'
import Footer from './components/global/Footer'

import { Alert } from './components/alert/Alert'

import { refreshToken } from './redux/actions/authAction'

// Test
import Schedule from './pages/Schedule'
import LoginSMS from './components/auth/LoginSMS'
import LoginPass from './components/auth/LoginPass'
import AccountSetupPage from './pages/profile/setup'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <div className="app-container container-fluid">
      <Router>
        <Alert />
        <Header />

        <Routes>
          <Route path="/" element={<PageRender />} />
          <Route path="/:page" element={<PageRender />} />
          <Route path="/:page/:slug" element={<PageRender />} />

          <Route path="schedule" element={<Schedule />} />
          
          <Route path="login-pass" element={<LoginPass />} />
        
          <Route path="login-sms" element={<LoginSMS />} />
        
          <Route path="account-setup" element={<AccountSetupPage />} />

        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App