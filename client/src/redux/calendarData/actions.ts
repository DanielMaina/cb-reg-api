import * as actions from './actionTypes';

export const addEvent = (...payload) => ({

    type: actions.ADD_EVENT,
    payload: {
        ...payload
    }
});

export const removeEvent = (...payload) => ({

    type: actions.REMOVE_EVENT,
    payload: {
        ...payload
    }
});

export const updateEvent = (...payload) => ({

    type: actions.UPDATE_EVENT,
    payload: {
        ...payload
    }
});
