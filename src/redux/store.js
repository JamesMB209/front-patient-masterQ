import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { authReducer } from "./auth/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  authStore: authReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);
