import {
    LOAD_OBJ,
    SUBMIT_REVIEW,
} from "./actions";

const initialState = {
    state: 'CHECKIN'
};

export function patientObjReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_OBJ:
            return Object.assign({}, state, { ...action.payload });
        case SUBMIT_REVIEW:
            return Object.assign({}, state, {state: 'CHECKIN'})
        default:
            return state;
    }
}
