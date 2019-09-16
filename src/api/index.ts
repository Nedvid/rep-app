import { ngExpressEngine, NgSetupOptions } from '@nguniversal/express-engine';

import * as express from 'express';

export function createApi(distPath: string, ngSetupOptions: NgSetupOptions) {
  const api = express();
  const bodyParser = require('body-parser');  
  const session = require('express-session');
  const RedisStore = require('connect-redis')(session);
  const Raven = require('raven');

  if (process.env.RAVEN_DSN) {
    Raven.config(`${process.env.RAVEN_DSN}`).install();
  }


  api.use(
    session({
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: 6379,
        db: parseInt(process.env.REDIS_DB, 10)
      }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false
    })
  );

  api.use(bodyParser.urlencoded({ extended: false }));
  api.use(bodyParser.json());

  api.set('view engine', 'html');
  api.set('views', distPath);

  // Angular Express Engine
  api.engine('html', ngExpressEngine(ngSetupOptions));


  // Server static files from distPath
  api.get('*.*', express.static(distPath));

  // All regular routes use the Universal engine
  api.get('*', (req, res) => {
    if (
      req.headers.referer === 'https://www.google.com/' &&
      req.query.source !== 'google'
    ) {
      res.redirect('?source=google');
    } else {
      res.render('index', { req, res });
    }
  });

  return api;
}
