const proxy = require('http-proxy-middleware');

const proxyRewritePath = (regex, target) => ({
  target,
  pathRewrite: {
    [regex]: '/',
  },
});

module.exports = function(app) {
  app.use(proxy('/nav/', proxyRewritePath('^/nav', 'http://localhost:1234')));
  app.use(
    proxy(
      '/calendar/',
      proxyRewritePath('^/calendar', 'http://localhost:1235'),
    ),
  );
  app.use(
    proxy(
      '/checkout/',
      proxyRewritePath('^/checkout', 'http://localhost:1236'),
    ),
  );
  app.use(
    proxy(
      '/dashboard/',
      proxyRewritePath('^/dashboard', 'http://localhost:1237'),
    ),
  );
};
