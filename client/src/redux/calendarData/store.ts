import { createStore, combineReducers } from "redux";
import scheduleReducer from "../reducers/scheduleReducer";

const reducers = combineReducers({
    calendar: scheduleReducer
})

const store = createStore(reducers);
export default store;
