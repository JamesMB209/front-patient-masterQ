import {
  LOGIN_SUCCESS_ACTION,
  LOGIN_FAILURE_ACTION,
  LOGOUT_NOW_ACTION,
} from "./actions";

const initialState = {
  isAuthenticated: false || localStorage.getItem("token") != null,
  config: {}
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS_ACTION:
      return Object.assign({}, state, { isAuthenticated: true }, { config: { ...action.config }}, {businessConfig: {...action.businessConfig}});
    case LOGIN_FAILURE_ACTION:
      return state;
    case LOGOUT_NOW_ACTION:
      return Object.assign({}, state, { isAuthenticated: false }, { config: {} }, {businessConfig: {}});
    default:
      return state;
  }
}
