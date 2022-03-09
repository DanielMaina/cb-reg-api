import { IUser, ISchedule } from '../../utils/Typescript'

// Calendar Event Types
export const ADD_EVENT = 'addEvent'
export const REMOVE_EVENT = 'removeEvent'
export const UPDATE_EVENT = 'updateEvent'

export interface IScheduleFor {
    user: IUser
    schedule: ISchedule
}

export interface IScheduleAdd {
    type: typeof ADD_EVENT
    payload: IScheduleFor
}

export interface IScheduleRemove {
    type: typeof REMOVE_EVENT
    payload: IScheduleFor
}

export interface IScheduleUpdate {
    type: typeof UPDATE_EVENT
    payload: IScheduleFor
}

export type IScheduleAny = IScheduleAdd | IScheduleRemove | IScheduleUpdate;