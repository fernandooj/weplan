// @flow weak

import React        from 'react';
import {
  Route,
  Switch
}                   from 'react-router';
import User         from '../views/user/User';
import Planes       from '../views/planes/Planes';
import Dashboard    from '../views/dashboard/Dashboard';
import Protected    from '../views/protected/Protected';
import PrivateRoute from '../components/privateRoute/PrivateRoute';

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/user" component={User} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/planes" component={Planes} />
      {/* private views: need user to be authenticated */}
      <PrivateRoute path="/protected" component={Protected} />
    </Switch>
  );
};

export default MainRoutes;
