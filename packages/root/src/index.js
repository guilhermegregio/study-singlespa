import {registerApplication, start} from 'single-spa';
import * as serviceWorker from './serviceWorker';
import './index.css';

const SystemJS = window.System;
const pathPrefix = prefix => location => location.pathname.startsWith(prefix);

registerApplication('root', () => import('./root.app.js'), () => true);
registerApplication(
  'nav-app',
  () => SystemJS.import('/nav/singleSPA.js'),
  () => true,
);
registerApplication(
  'calendar-app',
  () => SystemJS.import('/calendar/singleSPA.js'),
  location =>
    pathPrefix('/calendar')(location) ||
    location.pathname === '' ||
    location.pathname === '/',
);
registerApplication(
  'checkout-app',
  () => SystemJS.import('/checkout/singleSPA.js'),
  pathPrefix('/checkout'),
);
registerApplication(
  'dashboard-app',
  () => SystemJS.import('/dashboard/singleSPA.js'),
  pathPrefix('/dashboard'),
);

start();
serviceWorker.unregister();
