import {
    LOAD_OBJ,
} from "./actions";

const initialState = {
    state: 'CHECKIN'
};

export function patientObjReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_OBJ:
            return Object.assign({}, state, { ...action.payload });
        default:
            return state;
    }
}
