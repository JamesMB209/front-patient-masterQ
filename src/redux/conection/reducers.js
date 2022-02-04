import { 
    UPDATE_CONNECTION
} from "./actions";

const initialState = {
    business:null, doctor:null,
};

export function connectionReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONNECTION:    
            return Object.assign({}, state, {...action.payload});
        default:
            return state;
    }
}
