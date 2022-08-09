const next = require('next');
const routes = require('./routes').routes;
const isProduction = process.env.NODE_ENV === 'production';
const app = next({dev: !isProduction});
const handler = routes.getRequestHandler(app);
const compression = require('compression');
const helmet = require('helmet');

// With express
const express = require('express');

app.prepare().then(() => {
  const server = express();

  if (isProduction) {
    server.use(forceSsl);
  }

  server.use(compression());
  server.use(helmet.frameguard({
    action: "deny",
  }));

  server.use(helmet.noSniff());
  server.use(function (req, res, next) {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  server.use(
    helmet.referrerPolicy({
      policy: ["origin-when-cross-origin", "strict-origin-when-cross-origin"],
    })
  );

  server.use(handler);
  server.listen(process.env.PORT || 3001);
});
