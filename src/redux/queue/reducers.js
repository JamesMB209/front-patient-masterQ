import {
    CHECKIN_ACTION,
    CHECKOUT_ACTION,
    MOVE_PHARAMACY_ACTION,
    REVIEW_ACTION,
} from "./actions";

const initialState = {
    checkedIn: false, business: '', doctor: ''
};

export function queueReducer(state = initialState, action) {
    switch (action.type) {
        case CHECKIN_ACTION:
            return Object.assign({}, state, { checkedIn: true }, { business: action.business }, { doctor: action.doctor });
        case CHECKOUT_ACTION:
            return Object.assign({}, state, { checkedIn: false });
        case MOVE_PHARAMACY_ACTION:
            return state;
        case REVIEW_ACTION:
            return state;
        default:
            return state;
    }
}
