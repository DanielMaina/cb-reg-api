import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import scheduleReducer from './scheduleReducer'

export default combineReducers({
  auth,
  alert,
  schedule: scheduleReducer
})