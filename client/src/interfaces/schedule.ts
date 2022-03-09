import * as actions from '../redux/calendarData/actionTypes';
import IContact from "./contact";

export interface ISchedule {
    id: number;
    title: string
    dateFrom: string
    dateTo: string
    timeFrom: String
    timeTo: string
    location: string
    contacts: IContact[]
    notes: string
}

export interface AddEvent {
    type: typeof actions.ADD_EVENT
    payload: ISchedule
}

export interface DelEvent {
    type: typeof actions.REMOVE_EVENT
    payload: ISchedule
}

export interface EditEvent {
    type: typeof actions.UPDATE_EVENT
    payload: ISchedule
}
