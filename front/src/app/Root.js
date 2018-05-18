// @flow weak

// #region imports
import React, {
  Component
}                               from 'react';
import {
  Router,
  Switch,
  Route,
  BrowserRouter
}                               from 'react-router-dom';
// #region import createHistory from hashHistory or BrowserHistory:

// import createHistory            from 'history/createBrowserHistory';
// #endregion
import App                      from './containers/app/App';
 
 
import PageNotFound             from './pages/pageNotFound/PageNotFound'; // not connected to redux (no index.js)
import LogoutRoute              from './components/logoutRoute/LogoutRoute';

 


import { Provider } from 'react-redux';
import store from './redux/store.js'
// #endregion

// #region flow types
type Props = any;
type State = any;
// #endregion

 

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
         <BrowserRouter>
          <Switch>
            <App />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Root;
