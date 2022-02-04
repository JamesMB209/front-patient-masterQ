import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { authReducer } from "./auth/reducers";
import { appConfigReducer } from "./appConfig/reducers";
import { patientObjReducer } from "./patientObj/reducers";
import { connectionReducer } from "./conection/reducers";
import { emit, init } from "./webSockets/actions"


const rootReducer = combineReducers({
  authStore: authReducer,
  appConfigStore: appConfigReducer,
  patientObjStore: patientObjReducer,
  connectionStore: connectionReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk.withExtraArgument({emit})))
// );

/** create the store */
export const store = createStore( 
  rootReducer, 
  compose(
    applyMiddleware(
      logger,
      thunk.withExtraArgument({emit}),
    )
  )
);

/** Apply the init the socket .on classes against the store */
init( store );
