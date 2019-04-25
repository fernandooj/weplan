// @flow weak

import React                from 'react';
import { render }           from 'react-dom';
 
import { AppContainer }     from 'react-hot-loader';
import smoothScrollPolyfill from 'smoothscroll-polyfill';
import Root                 from './Root';
import 'animate.css';

import axios from 'axios'
import './style/index.scss';  


// export const URL = window.location.origin;


 
// smoothscroll polyfill
smoothScrollPolyfill.polyfill();
// force polyfill (even if browser partially implements it)
window.__forceSmoothScrollPolyfill__ = true;

const ELEMENT_TO_BOOTSTRAP  = 'root';
const BootstrapedElement    = document.getElementById(ELEMENT_TO_BOOTSTRAP);

 

// export const URL = 'https://releo.co/public/assets/img/';
// export const URL2 = window.location.origin
// axios.defaults.baseURL = URL2+"/x/v1/";
export const URL = "http://muneo.co/";
export const URL2  = window.location.origin;
axios.defaults.baseURL = URL2;


const renderApp = RootComponent => {
  render(
    <AppContainer
      warnings={false}
    >
      <RootComponent />
    </AppContainer>,
    BootstrapedElement
  );
};

renderApp(Root);

if (module.hot) {
  module.hot.accept(
    './Root',
    () => {
      const RootComponent = require('./Root').default;
      renderApp(RootComponent);
    }
  );
}
