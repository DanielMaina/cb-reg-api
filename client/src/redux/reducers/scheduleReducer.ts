//import React from 'react';
import * as actions from '../calendarData/actionTypes';
import { ISchedule, AddEvent, DelEvent, EditEvent } from '../../interfaces/schedule';

 

interface State {
    eventList: ISchedule[] | []
}

type Action = AddEvent | DelEvent | EditEvent;

let lastId = 3;

const initialState = {
    eventList: [
        {
            id: 1,
            title: 'Finding Julia',
            dateFrom: 'Mar 12 2022',
            dateTo: '',
            timeFrom: '',
            timeTo: '',
            location: '',
            contacts: [{
                id: 0,
                name: 'John',
                phone: '778-888-8888',
                email: 'john@gmail.com'
            }],
            notes: 'something'
        },
        {
            id: 2,
            title: 'Something',
            dateFrom: 'Apr 3 2022',
            dateTo: '',
            timeFrom: '',
            timeTo: '',
            location: '',
            contacts: [{
                id: 1,
                name: 'John',
                phone: '778-888-8888',
                email: 'john@gmail.com'
            }],
            notes: 'nothing much'
        }]
}

const calendarReducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case actions.ADD_EVENT:
            return {
                ...state,
                eventList: [
                    ...state.eventList,
                    {
                        ...action.payload,
                        id: lastId++
                    }
                ]
            }
        // return state.eventList.push(
        //     ...action.payload,
        //     {
        //         id: lastId++
        //     });

        case actions.REMOVE_EVENT:
            return state.eventList.filter(event => event.id !== action.payload.id);

        case actions.UPDATE_EVENT:
            const updatedList = state.eventList.map(event => event.id === action.payload.id ? {
                ...state,
                eventList: [
                    ...state.eventList,
                    {
                        ...event,
                        ...action.payload
                    }
                ]
            } : event);
            return {
                ...state,
                eventList: updatedList
            }

        default:
            return state;
    }
};

export default calendarReducer;
