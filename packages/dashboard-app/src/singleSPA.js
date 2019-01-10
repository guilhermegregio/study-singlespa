import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import singleSpaReact from 'single-spa-react';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [
  function() {
    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '/dashboard/singleSPA.css';
    head.appendChild(link);
    return reactLifecycles.mount(...arguments);
  },
];

export const unmount = [reactLifecycles.unmount];

function domElementGetter() {
  return document.getElementById('dashboard');
}
