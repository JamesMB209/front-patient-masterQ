import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { authReducer } from "./auth/reducers";
import { queueReducer } from "./queue/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { appConfigReducer } from "./appConfig/reducers";
import { emit, init } from "./webSockets/actions"


const rootReducer = combineReducers({
  authStore: authReducer,
  queueStore: queueReducer,
  appConfigStore: appConfigReducer
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk.withExtraArgument({emit})))
// );

// init ( store )

export const store = createStore( 
  rootReducer, 
  compose(
    applyMiddleware(
      logger,
      thunk.withExtraArgument({emit}),
    )
  )
);

init( store );
