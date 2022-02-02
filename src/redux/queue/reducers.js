import {
    UPDATE_QUEUE,
} from "./actions";

const initialState = {
    state: 'CHECKIN', business: '', doctor: '', queuePosition: ''
};

export function queueReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_QUEUE:
            console.log(action);
            // return Object.assign({}, state, { state:"DOCTOR" }, { business: "7" }, { doctor: "10" }, { queuePosition: action.queuePostion });
            return Object.assign({}, state, { state:action.state }, { business: action.business }, { doctor: action.doctor }, { queuePosition: action.queuePosition });
        default:
            console.log(action.type)
            console.log("triggered")
            return state;
    }
}
