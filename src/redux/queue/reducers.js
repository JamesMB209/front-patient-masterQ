import {
    NEXT,
    CHECKIN,
    LOAD_OBJ,
} from "./actions";

import {
    // UPDATE_ME,
    UPDATE_PATIENT,
} from "../webSockets/actions"

// const token = localStorage.getItem("token");
// const address = token.slice(-10)

const initialState = {
    state: 'CHECKIN'
};

export function queueReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_OBJ:
            console.log(action)
            return Object.assign({}, state, {...action.payload});
        case CHECKIN:
            return Object.assign({}, state, { state: action.state }, { business: action.business }, { doctor: action.doctor }, { queuePosition: action.queuePosition });
        default:
            return state;
    }
}
