import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import App from './App.js';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export const bootstrap = [reactLifecycles.bootstrap];

export const mount = [
  function() {
    if (!document.getElementById('calendar-styles')) {
      const head = document.getElementsByTagName('head')[0];
      const link = document.createElement('link');
      link.id = 'calendar-styles';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/calendar/singleSPA.css';
      head.appendChild(link);
    }
    return reactLifecycles.mount(...arguments);
  },
];

export const unmount = [reactLifecycles.unmount];

function domElementGetter() {
  return document.getElementById('calendar');
}
