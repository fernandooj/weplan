// @flow weak

import React        from 'react';
import {
  Route,
  Switch
}                 from 'react-router';
import Home       from '../pages/home/Home';
import Dashboard  from '../pages/dashboard/Dashboard';
 
import Usuario     from '../pages/usuario/Usuario';
import Restriccion from '../pages/restriccion/restriccion';
import Plan        from '../pages/plan/Plan';
import Categoria   from '../pages/categoria/categoria';
 
 
 

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
 
      <Route path="/usuario/" component={Usuario} />
      <Route path="/plan/"    component={Plan} />
      <Route path="/restriccion/"  component={Restriccion}  />
      <Route path="/categoria/"  component={Categoria}  />
 
    </Switch>
  );
};

export default MainRoutes;
