import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authType'
import { IUser, ISchedule } from '../../utils/Typescript'
import { 
    ADD_EVENT, 
    IScheduleAny } from 'redux/types/scheduleTypes'
import { ALERT, IAlertType } from '../types/alertType'

import { postAPI, getAPI } from '../../utils/FetchData'
import { validRegister, validPhone } from '../../utils/Valid'


export const addSchedule = (user: IUser, schedule: ISchedule) => 
async (dispatch: Dispatch<IScheduleAny | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })

        const res = await postAPI('schedule', user)

        dispatch({
            type: ADD_EVENT,
            payload: res.data
        })

        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        localStorage.setItem('googleCalendar', 'synced')

        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const removeSchedule = (user: IUser, schedule: ISchedule) => 
async () => {
    try {
        
        
    } catch (err: any) {
        
    }
}

export const updateSchedule = (user: IUser, schedule: ISchedule) => 
async () => {
    try {
        
        
    } catch (err: any) {
        
    }
}


