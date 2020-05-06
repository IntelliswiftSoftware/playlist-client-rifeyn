import React from "react";
import Login from '../../components/login';
import Dashboard from '../../components/dashboard';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";

export default function RoutingHolder (props) {
const { history } = props;

  return (
    <Router history={history}>
        <Switch>
          <Route path='/' exact={true} render={() => <Login history={history}/>} />
          <Route path='/dashboard' exact={true} render={() => <Dashboard history={history}/>} />
        </Switch>
    </Router>
  );
}
