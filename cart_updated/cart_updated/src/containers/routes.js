import React from 'react';
import { Route, Switch } from 'react-router';
import MainPage from '../components/MainPage';

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default routes;