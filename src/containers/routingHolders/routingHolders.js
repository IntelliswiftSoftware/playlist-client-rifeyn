import React from 'react';
import {
  Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from '../../components/login';
import Dashboard from '../../components/dashboard';


const RoutingHolder = (props) => {

  const { history, userDetails } = props;
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        userDetails.id ? (
          <Component {...props} />
        )
          : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          ))}
    />
  );
  return (
    <div>
      <Router history={history}>
        <Switch>
          <PrivateRoute
            path="/dashboard"
            component={() => <Dashboard history={history} />}
          />
          <Route
            path="/login"
            render={() => <Login history={history} />}
          />
          <PrivateRoute
            path="/"
            exact={true}
            component={() => <Login history={history} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state => ({
  userDetails: state.utilsReducer.userDetails
});

export default connect(mapStateToProps)(RoutingHolder);
