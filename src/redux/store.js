import { createStore, applyMiddleware, compose } from "redux";
import reducers from './Reducers'
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";

const loggerMiddleware = createLogger();

const composeEnhancers = (window && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let tempStore = createStore(reducers, composeEnhancers(applyMiddleware(loggerMiddleware)));

export const store = tempStore;

export const persistor = persistStore(store);
