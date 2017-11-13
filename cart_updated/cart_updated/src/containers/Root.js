import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import routes from './routes';

const history = createBrowserHistory();
const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
);

export default Root;
