import {
    CHECKIN_ACTION,
    MOVE_PHARAMACY_ACTION,
    REVIEW_ACTION
} from "./actions";

const initialState = {
    queueStatus: { checkedin: false }
};

export function queueReducer(state = initialState, action) {
    switch (action.type) {
        case CHECKIN_ACTION:
            return Object.assign({}, state, { checkedin: true });
        case MOVE_PHARAMACY_ACTION:
            return state;
        case REVIEW_ACTION:
            return state;
        default:
            return state;
    }
}
