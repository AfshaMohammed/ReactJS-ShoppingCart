import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/items';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history'; 

const history = createBrowserHistory();
const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default function configureStore(preloadedState) {
  return createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    enhancer
  );
}
